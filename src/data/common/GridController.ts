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
import { GridControllerConfig } from "./GridControllerConfig";
import { getDateFormater, getNumberFormater } from "./numberAndDateFormat";
import { relatedDialogStore } from "../../state/relatedDialogStore";
import { GridControllerTypes, gridControllers } from "../gridControllers";

/**
 * helper for controlling grid
 * no need for edits, common data
 */
export class GridController<T, U = unknown> {
  #datainterface: GridControllerConfig<T>;
  #gridDatasource: Datasource<T>;
  #gridInterface: GridInterface<T>;
  #stateStore: UseBoundStore<StoreApi<GridControllerState>>;
  #initgridConfig: GridConfig;
  #service: ServiceController<T, U>;

  constructor(
    datainterface: GridControllerConfig<T>,
    serviceController: ServiceController<T, U>
  ) {
    this.#datainterface = datainterface;
    this.#initgridConfig = this.#generateGridConfig();
    this.#gridDatasource = new Datasource<T>();
    this.#gridDatasource.setDateFormater(getDateFormater());
    this.#gridDatasource.setNumberFormater(getNumberFormater());

    this.#gridInterface = new GridInterface<T>(
      this.#initgridConfig,
      this.#gridDatasource
    );
    this.#stateStore = create<GridControllerState>(() => ({
      isLoading: false,
      isEditmode: false,

      isEditAllowed: true,
      isDeleteAllowed: true,
      isNewAllowed: true,
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
    // logic for popup on related source to select item- event "cell-focus-button-click"
    // copy/past values, + events "copy-cell" & "paste"
    // removed from grid (dynamic column for logic only)
    // double click on cell should open for edit
    // readonly if logic
    // also have minior changes I want to add to the grid component
    // - reset cell / reset row / reset selection
    // - option to show deleted rows, but just tag them
    // entity handler override, to add dynamic columns

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
        readonly: c.parentDataInterface ? false : c.readOnly,
        type: c.type,
        allowPasteClearOnly: c.parentDataInterface ? true : false,
        focusButton: c.parentDataInterface
          ? "SHOW_IF_GRID_AND_CELL_NOT_READONLY"
          : undefined,
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

    let lastCopyEvent: {
      attribute: string;
      data: Record<string, unknown>;
    } | null = null;

    const eventHandler = {
      handleEvent: (event: {
        type: string;
        data?: {
          attribute: string;
          // when copying
          rowData: Record<string, unknown>;
          // when pasting... yes bad planning
          entity: Record<string, unknown>;
        };
      }) => {
        console.log(event);

        if (event.type === "filter-operator-change") {
          // todo
        }

        if (event.type === "clear") {
          if (!event.data) return;

          const config = this.#datainterface.columns.filter(
            (e) => e.attribute === event.data?.attribute
          )[0];
          if (!config) return;

          // we need to update linked, but just the "to" part
          config.parentDataInterface?.columnsFromTo?.forEach(([, column]) => {
            if (!event.data?.rowData) return;

            if (event.data.rowData) {
              event.data.rowData[column] = null;
            }
          });
        }

        if (event.type === "cell-focus-button-click") {
          const config = this.#datainterface.columns.filter(
            (e) => e.attribute === event.data?.attribute
          )[0];

          let sourceName;
          const sourceKeys = Object.keys(gridControllers);
          sourceKeys.forEach((key) => {
            // dunno how to make it happy atm
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (gridControllers[key] === this) {
              sourceName = key as keyof GridControllerTypes;
            }
          });

          // make sure we have eveything before continue
          if (!sourceName) return;
          if (!config) return;
          if (!config.parentDataInterface) return;

          relatedDialogStore
            .getState()
            .activateRelatedDialog(
              sourceName as keyof GridControllerTypes,
              config.parentDataInterface.ref,
              config.parentDataInterface.title,
              config.parentDataInterface.columnFrom,
              config.parentDataInterface.columnTo,
              config.parentDataInterface.columnsFromTo
            );
        }

        if (event.type === "copy-cell") {
          // we want to override copy/paste into cell
          // since we might want releated data to come over
          // so user do not need to refresh rows to se something like description/type/dim columns correct

          const attribute = event?.data?.attribute || "!_X_!";

          const rowData = event?.data?.rowData;
          if (!rowData) return;

          const data: Record<string, unknown> = {};

          const keys = this.#datainterface.columns.map(
            (e) => e.attribute
          ) as string[];

          keys.forEach((key) => {
            data[key] = rowData[key];
          });

          lastCopyEvent = {
            data,
            attribute,
          };
        }

        if (event.type === "paste") {
          // we want to override copy/paste into cell
          // since we might want releated data to come over
          // so user do not need to refresh rows to se something like description/type/dim columns correct

          if (!event.data) return;

          const attribute = event?.data?.attribute || "!_X_!";

          if (lastCopyEvent && lastCopyEvent.attribute === attribute) {
            const config = this.#datainterface.columns.filter(
              (e) => e.attribute === event.data?.attribute
            )[0];
            if (!config) return;

            // we need to update linked, but just the "to" part
            // maybe we also
            config.parentDataInterface?.columnsFromTo?.forEach(([, column]) => {
              if (!lastCopyEvent) return; // ts dont understand we have it
              if (!event.data?.entity) return;

              const valueToUse = lastCopyEvent.data[column];
              if (event.data.entity) {
                event.data.entity[column] = valueToUse;
              }
            });
          }
        }

        // todo: always return true to continue subscribing
        return true;
      },
    };

    this.#gridInterface.addEventListener(eventHandler);
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
  requestCustomEvent(event: U) {
    this.#service.callEventHandlerCustom(event);
  }

  getStore() {
    return this.#stateStore;
  }

  storeHook() {
    return this.#stateStore();
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

export type GridControllerState = {
  isLoading: boolean;
  isEditmode: boolean;
};

export type GridChanges<T> = {
  newEntities: Partial<T>[];
  deletedEntities: Partial<T>[];
  modifiedEntities: Partial<T>[];
};

export type ControllerEvent<T> =
  | {
      // more like a force reload
      type: "FETCH_ALL";
      data: null;
    }
  | {
      // for smarter update
      // if we have modified column we can trust this can be useful
      type: "REFRESH_ALL";
      data: null;
    }
  | {
      // saving
      type: "CHANGE";
      data: GridChanges<T>;
    };

/**
 * helper for updating grid operator pretty text/short text
 * @param operator
 * @returns
 */

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
