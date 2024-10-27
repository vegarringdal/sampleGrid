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
import {
  GridControllerConfig,
  GridControllerConfigColumn,
} from "./GridControllerConfig";
import { getDateFormater, getNumberFormater } from "./numberAndDateFormat";
import { relatedDialogStore } from "../../state/relatedDialogStore";
import { GridControllerTypes, gridControllers } from "../gridControllers";
import { generateExcel } from "../../utils/excel/generateExcel";
import { generateExcelCallback } from "../../utils/excel/generateExcelCallback";

/**
 * helper for controlling grid
 * no need for edits, common data
 */
export class GridController<T, U = unknown> {
  #gridControllerConfig: GridControllerConfig<T>;
  #gridDatasource: Datasource<T>;
  #gridInterface: GridInterface<T>;
  #stateStore: UseBoundStore<StoreApi<GridControllerState>>;
  #initgridConfig: GridConfig;
  #serviceController: ServiceController<T, U>;

  constructor(
    datainterface: GridControllerConfig<T>,
    serviceController: ServiceController<T, U>,
  ) {
    this.#gridControllerConfig = datainterface;
    this.#initgridConfig = this.#generateGridConfig();
    this.#gridDatasource = new Datasource<T>();
    this.#gridDatasource.setDateFormater(getDateFormater());
    this.#gridDatasource.setNumberFormater(getNumberFormater());

    this.#gridInterface = new GridInterface<T>(
      this.#initgridConfig,
      this.#gridDatasource,
    );
    this.#stateStore = create<GridControllerState>(() => ({
      isLoading: false,
      isEditmode: false,

      isEditAllowed: true,
      isDeleteAllowed: true,
      isNewAllowed: true,
    }));

    this.#serviceController = serviceController;
    this.#serviceController.connectDataSource(this);

    this.#init();
  }

  /**
   * all logic to build standard gridConfig
   * gridController config helps us abstract away default
   * gridconfig so its easier to add workarounds/newer gird
   * @returns
   */
  #generateGridConfig() {
    //console.log("TODO, generate gridConfig", this.#gridControllerConfig);

    const config = {
      columnsCenter: [] as unknown,
      attributes: [],
    } as GridConfig;

    this.#gridControllerConfig.columns.forEach((c, i) => {
      const primaryCol = this.#gridControllerConfig.primaryColumn;

      const attribute: Attribute = {
        attribute: c.attribute as string,
        label: (c.label as string) || (c.attribute as string),
        placeHolderRow: getRowPlaceholder(
          c.type,
          (c.label as string) || (c.attribute as string),
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
        (this.#gridControllerConfig?.colWidth &&
          this.#gridControllerConfig?.colWidth[i]) ||
        100;

      config.columnsCenter.push({
        width: colWidth,
        rows: [c.attribute as string],
      });

      config.attributes.push(attribute);
    });

    if (this.#gridControllerConfig?.groupCells?.length) {
      config.columnsCenter = [];
      this.#gridControllerConfig?.groupCells.forEach((rows, i) => {
        const colWidth =
          (this.#gridControllerConfig?.colWidth &&
            this.#gridControllerConfig?.colWidth[i]) ||
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
   * All logic to controll grid will be here
   * Mostly to save us for a lot of work
   */
  #init() {
    /**
     * for coloring cell based on row/cell type
     */

    this.#gridInterface.cellAppendClassSetter(
      (attribute: string, rowData: Entity, isReadOnly: boolean) => {
        const c = rowData.__controller;

        if (isReadOnly) {
          return { dimmedClass: "", inputClass: "" };
        }

        if (c && c.__isNew) {
          return { dimmedClass: " new-cell", inputClass: "" };
        }

        if (c && c.__editedProps && c.__editedProps[attribute]) {
          return { dimmedClass: " edit-cell", inputClass: "" };
        }

        return { dimmedClass: "", inputClass: "" };
      },
    );

    /**
     * temp cache for cell copy
     */

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
          // when pasting..., why I have 2 ? Bad planning ?
          entity: Record<string, unknown>;
        };
      }) => {
        /**
         * filter operator, here we update our custom placeholder
         */

        if (event.type === "filter-operator-change") {
          // todo
        }

        if (event.type === "clear") {
          if (!event.data) return;

          const config = this.#gridControllerConfig.columns.filter(
            (e) => e.attribute === event.data?.attribute,
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

        /**
         * this is used for opening dialog
         */

        if (event.type === "cell-focus-button-click") {
          const config = this.#gridControllerConfig.columns.filter(
            (e) => e.attribute === event.data?.attribute,
          )[0];

          let sourceName;
          const sourceKeys = Object.keys(gridControllers);
          sourceKeys.forEach((key) => {
            const controller =
              gridControllers[key as keyof typeof gridControllers];
            if (controller === (this as unknown)) {
              sourceName = key;
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
              config.parentDataInterface.columnsFromTo,
            );
        }

        /**
         * copying cell value
         */

        if (event.type === "copy-cell") {
          // we want to override copy/paste into cell
          // since we might want releated data to come over
          // so user do not need to refresh rows to se something like description/type/dim columns correct

          const attribute = event?.data?.attribute || "!_X_!";

          const rowData = event?.data?.rowData;
          if (!rowData) return;

          const data: Record<string, unknown> = {};

          const keys = this.#gridControllerConfig.columns.map(
            (e) => e.attribute,
          ) as string[];

          keys.forEach((key) => {
            data[key] = rowData[key];
          });

          lastCopyEvent = {
            data,
            attribute,
          };
        }

        /**
         * pasting cell value
         */

        if (event.type === "paste") {
          // we want to override copy/paste into cell
          // since we might want releated data to come over
          // so user do not need to refresh rows to se something like description/type/dim columns correct

          if (!event.data) return;

          const attribute = event?.data?.attribute || "!_X_!";

          if (lastCopyEvent && lastCopyEvent.attribute === attribute) {
            const config = this.#gridControllerConfig.columns.filter(
              (e) => e.attribute === event.data?.attribute,
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

        // always return true to continue subscribing
        return true;
      },
    };

    this.#gridInterface.addEventListener(eventHandler);
  }

  getControllerConfig() {
    return structuredClone(this.#gridControllerConfig);
  }

  requestRefresh() {
    this.#serviceController.callEventHandler({
      type: "REFRESH_ALL",
      data: null,
    });
  }

  requestFetchAll() {
    this.#serviceController.callEventHandler({
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

    this.#serviceController.callEventHandler({
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
    this.#serviceController.callEventHandlerCustom(event);
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

  async createExcel() {
    await generateExcel(this.#gridInterface, generateExcelCallback);
  }

  copyRow() {
    const currentEntity = this.#gridDatasource.currentEntity;

    if (!currentEntity) return; // should prob show error
    if (!currentEntity.__controller) return;

    this.#gridDatasource.addNewEmpty();

    const newEntity = this.#gridDatasource.currentEntity as Record<
      string,
      unknown
    >;
    if (!newEntity) return; // should prob show error

    const columns: Record<string, GridControllerConfigColumn<T>> = {};

    // this could have side effects..
    this.#gridControllerConfig.columns.forEach((c) => {
      columns[c.attribute as string] = c;
    });

    if (currentEntity.__controller.__isNew) {
      for (const k in currentEntity) {
        if (
          k !== "__controller" &&
          k !== this.#gridControllerConfig.primaryColumn &&
          k !== "__KEY" &&
          !columns[k].readOnly
        ) {
          newEntity[k] = currentEntity[k];
        }
      }
    } else {
      //
      // TODO: need find related too
      //

      for (const key in currentEntity) {
        if (key === "__controller") {
          continue;
        }

        if (key === "__KEY") {
          continue;
        }

        if (!columns[key]) {
          continue;
        }

        if (columns[key].readOnly) {
          continue;
        }

        if (columns[key].clearIfCopy) {
          continue;
        }

        if (this.#gridControllerConfig.primaryColumn === key) {
          continue;
        }

        if (this.#gridDatasource.currentEntity) {
          newEntity[key] = currentEntity[key];
        }
      }
    }

    // force rerender, since we update cells manually after adding enity
    this.#gridInterface.triggerScrollEvent();
  }
}

/////////////////////////////////////////////
// helper classes/function , dont want 1 file per
//////////////////////////////////////////////

// temp storage in gridController
// will use this to controll shared components like button state etc
export type GridControllerState = {
  isLoading: boolean;
  isEditmode: boolean;
};

//events when we do save
export type GridChanges<T> = {
  newEntities: Partial<T>[];
  deletedEntities: Partial<T>[];
  modifiedEntities: Partial<T>[];
};

// default events for ServiceController
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

/**
 *
 * @param type
 * @param operatorType
 * @returns
 */
export function getFilterPlaceholder(
  type: DataTypes | undefined,
  operatorType: FilterComparisonOperator | null,
) {
  let placeholder = `${"text"} ${operator(operatorType || "EQUAL")}`;
  if (type === "date") {
    placeholder = `${getDateFormater().placeholder()} ${operator(
      operatorType || "GREATER_THAN_OR_EQUAL_TO",
    )}`;
  }
  if (type === "number") {
    placeholder = `num ${operator(operatorType || "GREATER_THAN_OR_EQUAL_TO")}`;
  }
  return placeholder;
}

export function getRowPlaceholder(
  type: DataTypes | undefined,
  labelOrName: string,
) {
  if (type === "date") {
    return `${labelOrName} - ${getDateFormater().placeholder()}`;
  }
  return labelOrName;
}
