import { Datasource } from "@simple-html/grid";
import { GridConfig, GridInterface } from "@simple-html/grid";
import { GridController } from "../data/common/GridController";
import { GridControllerTypes } from "../data/gridControllers";

const gridConfigChange: GridConfig = {
  cellHeight: 20,
  panelHeight: 25,
  footerHeight: 40,
  readonly: true,
  hideFilter: false,
  hideLabels: false,
  selectionMode: "multiple",
  grouping: [{ title: "Change Type", attribute: "$$changeType" }],
  sorting: [{ attribute: "$$changeType", ascending: true }],
  attributes: [],
  columnsCenter: [],
};

const defaultChangeColumns = [
  {
    label: "Primary Key Value",
    attribute: "$$primaryKeyValue"
  },
  {
    label: "Change Type",
    attribute: "$$changeType",
  },
  {
    label: "column changed",
    attribute: "$$columnChanged",
  },
  {
    label: "Old Value",
    attribute: "$$oldValue",
  },
  {
    label: "New Value",
    attribute: "$$newValue",
  },
];

const gridConfigNew: GridConfig = {
  cellHeight: 20,
  panelHeight: 25,
  footerHeight: 40,
  hideFilter: false,
  hideLabels: false,
  readonly: true,
  selectionMode: "multiple",
  attributes: [],
  columnsCenter: [],
};

const gridConfigDeleted: GridConfig = {
  cellHeight: 20,
  panelHeight: 25,
  footerHeight: 40,
  hideFilter: false,
  hideLabels: false,
  readonly: true,
  selectionMode: "multiple",
  attributes: [],
  columnsCenter: [],
};

const dataSourceChange = new Datasource();
const gridInterfaceChange = new GridInterface(
  gridConfigChange,
  dataSourceChange
);

const dataSourceNew = new Datasource();
const gridInterfaceNew = new GridInterface(gridConfigNew, dataSourceNew);

const dataSourceDeleted = new Datasource();
const gridInterfaceDeleted = new GridInterface(
  gridConfigDeleted,
  dataSourceDeleted
);

const newRows = new Map();
const deletedRows = new Map();
const changedRows = new Map();
const primaryKeyName = "";

export const importDataStore = {
  gridInterfaceChange,
  dataSourceChange,
  gridInterfaceNew,
  dataSourceNew,
  defaultChangeColumns,
  gridInterfaceDeleted,
  dataSourceDeleted,
  newRows,
  deletedRows,
  changedRows,
  currentGridController: {} as  GridController<keyof GridControllerTypes>,
  primaryKeyName,
};
