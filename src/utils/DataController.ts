import {
  Datasource,
  GridInterface,
  GridConfig,
  Entity,
  Attribute,
  FilterComparisonOperator,
  DataTypes,
} from "@simple-html/grid";
import { UseBoundStore, StoreApi, create } from "zustand";
import { ServiceController } from "./ServiceController";
import { DataInterface } from "./DataInterface";
import { getDateFormater } from "../state/dateNumberFormatStore";

/**
 * helper for data
 * no need for edits
 */
export class DataController<T> {
  #datainterface: DataInterface<T>;
  #gridDatasource: Datasource<T>;
  #gridInterface: GridInterface<T>;
  #stateStore: UseBoundStore<StoreApi<DataControllerState>>;
  #initgridConfig: GridConfig;
  #service: ServiceController<T>;

  constructor(
    datainterface: DataInterface<T>,
    serviceController: ServiceController<T>
  ) {
    this.#datainterface = datainterface;
    this.#initgridConfig = this.#generateGridConfig();
    this.#gridDatasource = new Datasource<T>();
    this.#gridInterface = new GridInterface<T>(
      this.#initgridConfig,
      this.#gridDatasource
    );
    this.#stateStore = create<DataControllerState>(() => ({
      isLoading: false,
      isEditmode: false,
    }));

    this.#service = serviceController;
    this.#service.connectDataSource(this);

    this.#init();
  }

  /**
   * will use dataInterface to generate gridConfig
   * @returns
   */
  #generateGridConfig() {
    console.log("TODO, generate gridConfig", this.#datainterface);

    const config = {
      columnsCenter: [] as unknown,
      attributes: [],
    } as GridConfig;

    // a LOT to do here, having it very simple for now
    this.#datainterface.columns.forEach((c, i) => {
      const primaryCol = this.#datainterface.primaryColumn;

      const attribute: Attribute = {
        attribute: c.attribute as string,
        label: (c.label as string) || (c.attribute as string),
        placeHolderRow: getRowPlaceholder(
          c.type,
          (c.label as string) || (c.attribute as string)
        ),
        placeHolderFilter: getFilterPlaceholder(c.type, null),
        readonly: c.readOnly
      };

      if (c.mandatory) {
        attribute.mandatory = true;
        attribute.mandatoryOnlyIfEmpty = true;
      }

      if (c.attribute == primaryCol) {
        attribute.readonly = true;
      }

      const colWidth =
        (this.#datainterface?.colWidth && this.#datainterface?.colWidth[i]) ||
        100;

      config.columnsCenter.push({
        width: colWidth,
        rows: [c.attribute as string],
      });

      config.attributes.push(attribute);
    });

    if (this.#datainterface?.groupCells?.length) {
      config.columnsCenter = [];
      this.#datainterface?.groupCells.forEach((rows, i) => {
        const colWidth =
          (this.#datainterface?.colWidth && this.#datainterface?.colWidth[i]) ||
          100;

        config.columnsCenter.push({
          width: colWidth,
          rows,
        });
      });
    }

    return config;
  }

  /**
   * will add event listners etc to do most of logic here
   */
  #init() {
    this.#gridInterface.cellAppendClassSetter(
      (attribute: string, rowData: Entity, isReadOnly: boolean) => {
        const c = rowData.__controller;

        if (isReadOnly) {
          return { dimmedClass: "", inputClass: "" };
        }

        if (c && c.__editedProps && c.__editedProps[attribute]) {
          return { dimmedClass: " edit-cell", inputClass: "" };
        }

        return { dimmedClass: "", inputClass: "" };
      }
    );
  }

  requestRefresh() {
    this.#service.callEventHandler({
      type: "REFRESH_ALL",
      data: null,
    });
  }

  requestFetchAll() {
    this.#service.callEventHandler({
      type: "FETCH_ALL",
      data: null,
    });
  }

  requestSaveChanges() {
    const changes = this.#gridDatasource.getChanges() as {
      newEntities: Partial<T>[];
      deletedEntities: Partial<T>[];
      modifiedEntities: Partial<T>[];
    };

    this.#service.callEventHandler({
      type: "CHANGE",
      data: changes,
    });
  }

  /**
   * could be usefull for filtering sub grids etc/calling other related
   * will need something for this
   * @param event
   */
  requestCustomEvent(event: ControllerEvent<T>) {
    this.#service.callEventHandler(event);
  }

  getStore() {
    return this.#stateStore;
  }

  getGridInterface() {
    return this.#gridInterface;
  }

  getGridDatasource() {
    return this.#gridDatasource;
  }
}

/////////////////////////////////////////////
// helper classes/function , dont want 1 file per
//////////////////////////////////////////////

export type DataControllerState = {
  isLoading: boolean;
  isEditmode: boolean;
};

export type DataChanges<T> = {
  newEntities: Partial<T>[];
  deletedEntities: Partial<T>[];
  modifiedEntities: Partial<T>[];
};

export type ControllerEvent<T> =
  | {
      type: "FETCH_ALL";
      data: null;
    }
  | {
      type: "REFRESH_ALL";
      data: null;
    }
  | {
      type: "CHANGE";
      data: DataChanges<T>;
    };

export function operator(operator: Attribute["operator"]) {
  switch (operator) {
    case "CONTAINS":
      return "*";
    case "DOES_NOT_CONTAIN":
      return "!*";
    case "END_WITH":
      return "*x";
    case "EQUAL":
      return "==";
    case "NOT_EQUAL_TO":
      return "!=";
    case "GREATER_THAN":
      return ">";
    case "GREATER_THAN_OR_EQUAL_TO":
      return ">=";
    case "LESS_THAN":
      return "<";
    case "LESS_THAN_OR_EQUAL_TO":
      return "<=";
  }
}

export function getFilterPlaceholder(
  type: DataTypes | undefined,
  operatorType: FilterComparisonOperator | null
) {
  let placeholder = `${"text"} ${operator(operatorType || "EQUAL")}`;
  if (type === "date") {
    placeholder = `${getDateFormater().placeholder()} ${operator(
      operatorType || "GREATER_THAN_OR_EQUAL_TO"
    )}`;
  }
  if (type === "number") {
    placeholder = `num ${operator(operatorType || "GREATER_THAN_OR_EQUAL_TO")}`;
  }
  return placeholder;
}

export function getRowPlaceholder(
  type: DataTypes | undefined,
  labelOrName: string
) {
  if (type === "date") {
    return `${labelOrName} - ${getDateFormater().placeholder()}`;
  }
  return labelOrName;
}
