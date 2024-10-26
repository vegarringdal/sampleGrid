import { openAndReadExcelFile } from "./openAndReadExcelFile";
import { read, utils } from "xlsx";
import { importDialogStore } from "../../state/importDialogStore";
import { importDataStore } from "../../components/common/importDialog/importDataStore";
import { Entity } from "@simple-html/grid";
import { GridController } from "../../data/common/GridController";
import { GridControllerTypes } from "../../data/gridControllers";
import { serviceStore } from "../../state/serviceStore";
import { flushSync } from "react-dom";

/**
 *
 * @param gridController
 * @returns
 */

export async function readAndCompareData<T, U>(
  gridController: GridController<T, U>
) {
  // todo, cleanup
  // this is a bit messy and need cleanup
  // just tried to reuse some old project to save time

  flushSync(() => {
    serviceStore.setState({
      loadingDataDialogActivated: true,
      loadingDataDialogContent: "Parsing excel, please wait",
    });
  });

  let data: ArrayBuffer | undefined;
  try {
    data = await openAndReadExcelFile();
  } catch (e) {
    console.error("error open excel", e);
  }

  if (!data) {
    serviceStore.setState({
      loadingDataDialogActivated: false,
    });
    return;
  }

  const apiConfig = gridController.getControllerConfig();

  if (!apiConfig.isEditAllowed) {
    // if we cant update, then lets not allow anything
    alert("no access");
    return false;
  }

  // will keep data in maps when we compare
  const currentDataMap = new Map<string, Entity>();
  const importDataMap = new Map<string, Entity>();

  const newRows = importDataStore.newRows;
  newRows.clear();

  const deletedRows = importDataStore.deletedRows;
  deletedRows.clear();

  const changedRows = importDataStore.changedRows;
  changedRows.clear();

  const changeSet: Entity[] = [];

  const dsRows = gridController.getGridDatasource().getRows(true) as Entity[];
  const gridConfig = gridController.getGridInterface().saveConfig();
  const updatableColumns = new Set(
    apiConfig.columns.filter((c) => !c.readOnly)
  );

  const dateColumns = new Set(
    gridConfig.attributes
      .filter((e) => e.type === "date")
      .map((e) => e.attribute)
  );
  const numberColumns = new Set(
    gridConfig.attributes
      .filter((e) => e.type === "number")
      .map((e) => e.attribute)
  );
  const booleanColumns = new Set(
    gridConfig.attributes
      .filter((e) => e.type === "boolean")
      .map((e) => e.attribute)
  );
  const canDelete = apiConfig.isDeleteAllowed;
  const canInsert = apiConfig.isNewAllowed;
  const primaryKeyName = apiConfig.primaryColumn as string;
  const importColumns = apiConfig.columns
    .filter((e) => (e.showInImport ? true : false))
    .map((e) => structuredClone(e));

  // update so we can use this in dialog later
  importDataStore.primaryKeyName = primaryKeyName;
  importDataStore.currentGridController =
    gridController as unknown as GridController<
      keyof GridControllerTypes,
      unknown
    >;

  function getDataType(column: string) {
    if (dateColumns.has(column)) {
      return "date";
    }
    if (numberColumns.has(column)) {
      return "number";
    }
    if (booleanColumns.has(column)) {
      return "boolean";
    }
    return "string";
  }

  dsRows.forEach((row) => {
    const primaryKeyValue = row[primaryKeyName]?.toString();
    if (primaryKeyValue) {
      currentDataMap.set(primaryKeyValue, row);
    }
  });

  const workbook = read(data, { type: "array", cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const userData = utils.sheet_to_json(sheet, {
    raw: true,
    defval: null,
  }) as Entity[];

  let newRowCount = 0;
  userData.forEach((row) => {
    const primaryKeyValue = row[primaryKeyName]?.toString();
    if (primaryKeyValue && currentDataMap.has(primaryKeyValue)) {
      importDataMap.set(primaryKeyValue, row);
    } else {
      newRowCount++;
      row[primaryKeyName] = "new-row:" + newRowCount;
      importDataMap.set("new-row:" + newRowCount, row);
    }
  });

  if (canInsert) {
    importDataMap.forEach((currentData, primaryKeyValue) => {
      if (!currentDataMap.has(primaryKeyValue)) {
        currentData.$dummyPrimary = primaryKeyValue;
        newRows.set(primaryKeyValue, currentData);

        const changeRow: Record<string, unknown> = {
          $$primaryKeyName: primaryKeyName,
          $$columnDataType: getDataType(primaryKeyName),
          $$changeType: "New",
          $$primaryKeyValue: primaryKeyValue,
          $$columnChanged: "NA",
          $$oldValue: "NA",
          $$newValue: "NA",
        };

        if (importColumns && Array.isArray(importColumns)) {
          // TODO, this isnt really crash free, prb should add prefix or something
          importColumns.forEach((col) => {
            changeRow[col.attribute as string] =
              currentData[col.attribute as string];
          });
        }

        changeSet.push(changeRow);
      }
    });
  }

  currentDataMap.forEach((currentData) => {
    const primaryKeyValue = currentData[primaryKeyName]?.toString();
    const importData = importDataMap.get(primaryKeyValue);

    if (!importData) {
      if (canDelete) {
        deletedRows.set(primaryKeyValue, currentData);

        const changeRow: Record<string, unknown> = {
          $$primaryKeyName: primaryKeyName,
          $$columnDataType: getDataType(primaryKeyName),
          $$changeType: "Deleted",
          $$primaryKeyValue: primaryKeyValue,
          $$columnChanged: "NA",
          $$oldValue: "NA",
          $$newValue: "NA",
        };

        if (importColumns && Array.isArray(importColumns)) {
          // TODO, this isnt really crash free, prb should add prefix or something
          importColumns.forEach((col) => {
            changeRow[col.attribute as string] =
              currentData[col.attribute as string];
          });
        }

        changeSet.push(changeRow);
      }
    } else {
      updatableColumns.forEach((column) => {
        let newValue = importData[column.attribute as string] || "";
        const oldValue = currentData[column.attribute as string] || "";

        const columnDataType = getDataType(column.attribute as string);
        let changeRow: Record<string, unknown> | null = null;

        switch (columnDataType) {
          case "date":
            {
              const xNewValueDate = new Date(newValue);
              const timezoneOffset = xNewValueDate.getTimezoneOffset() / 60;
              xNewValueDate.setHours(xNewValueDate.getHours() - timezoneOffset);
              let xNewValueMS = new Date(xNewValueDate).getTime();
              let xOldValueMS = new Date(oldValue).getTime();
              if (isNaN(xNewValueMS)) {
                xNewValueMS = 0;
              }
              if (isNaN(xOldValueMS)) {
                xOldValueMS = 0;
              }

              const offset = Math.abs(xNewValueMS - xOldValueMS);

              // if 3000 ms offset, we consider it a change
              // Im not 100% why this is, excel bug on how it reads ISO dates? or sheetjs?
              if (offset > 3000) {
                changeRow = {
                  $$primaryKeyName: primaryKeyName,
                  $$columnDataType: columnDataType,
                  $$changeType: "Change",
                  $$primaryKeyValue: primaryKeyValue,
                  $$columnChanged: column.attribute,
                  $$oldValue: currentData[column.attribute as string],
                  $$newValue: new Date(
                    importData[column.attribute as string].setHours(
                      importData[column.attribute as string].getHours() -
                        timezoneOffset
                    )
                  ),
                };
              }
            }
            break;
          case "number":
            {
              let vOldValue = oldValue;
              if (newValue === 0 || newValue === "0") {
                newValue = "";
              }
              if (vOldValue === 0 || vOldValue === "0") {
                vOldValue = "";
              }

              if (vOldValue !== newValue) {
                changeRow = {
                  $$primaryKeyName: primaryKeyName,
                  $$columnDataType: columnDataType,
                  $$changeType: "Change",
                  $$primaryKeyValue: primaryKeyValue,
                  $$columnChanged: column.attribute,
                  $$oldValue: currentData[column.attribute as string],
                  $$newValue: importData[column.attribute as string],
                };
              }
            }
            break;
          case "boolean":
            {
              const vNewValue = newValue;
              let vOldValueBool = oldValue;

              // need to change the bool value to fix how config is set

              if (
                vOldValueBool === false ||
                vOldValueBool === null ||
                vOldValueBool === ""
              ) {
                vOldValueBool = false;
              }

              if (vOldValueBool !== vNewValue) {
                changeRow = {
                  $$primaryKeyName: primaryKeyName,
                  $$columnDataType: columnDataType,
                  $$changeType: "Change",
                  $$primaryKeyValue: primaryKeyValue,
                  $$columnChanged: column.attribute,
                  $$oldValue: vOldValueBool,
                  $$newValue: vNewValue,
                };
              }
            }
            break;
          default: {
            let vOldValue = oldValue;
            let vNewValue = newValue;

            if (typeof vOldValue === "string") {
              //sheets js or excel is converting\n to \r\n, so have to work around it
              vOldValue = vOldValue.replaceAll("\r\n", "\n");
            }

            if (typeof vNewValue === "string") {
              vNewValue = vNewValue.replaceAll("\r\n", "\n");
            }

            if (vOldValue !== vNewValue) {
              changeRow = {
                $$primaryKeyName: primaryKeyName,
                $$columnDataType: columnDataType,
                $$changeType: "Change",
                $$primaryKeyValue: primaryKeyValue,
                $$columnChanged: column.attribute,
                $$oldValue: oldValue,
                $$newValue: newValue,
              };
            }
          }
        }

        if (changeRow) {
          if (importColumns && Array.isArray(importColumns)) {
            importColumns.forEach((col) => {
              changeRow[col.attribute as string] =
                currentData[col.attribute as string];
            });
          }

          changeSet.push(changeRow);
        }
      });
    }
  });

  const defaultGridConfig = gridController.getGridInterface().saveConfig();

  importDataStore.gridInterfaceChange.getDatasource().setData(changeSet);

  const defaultChangeColumns: { attribute: string; label: string }[] =
    JSON.parse(JSON.stringify(importDataStore.defaultChangeColumns)); // intentinally skipped structuredClone

  // add additional columns if any
  const settings = importDataStore.gridInterfaceChange.saveConfig();

  // after primary value
  const before = importColumns
    .filter((e) => e.showInImport?.before)
    .sort((a, b) => {
      const x = a.showInImport?.orderBy || 0;
      const y = b.showInImport?.orderBy || 0;

      return x < y ? 0 : 1;
    });

  before.forEach((c) => {
    defaultChangeColumns.splice(1, 0, {
      label: c.label || (c.attribute as string),
      attribute: c.attribute as string,
    });
  });

  // after new/old values

  const after = importColumns
    .filter((e) => !e.showInImport?.before)
    .sort((a, b) => {
      const x = a.showInImport?.orderBy || 0;
      const y = b.showInImport?.orderBy || 0;

      return x < y ? 0 : 1;
    });

  after.forEach((c) => {
    defaultChangeColumns.push({
      label: c.label || (c.attribute as string),
      attribute: c.attribute as string,
    });
  });

  settings.attributes = defaultChangeColumns;
  settings.columnsCenter = defaultChangeColumns.map((e) => {
    return {
      width: 200,
      rows: [e.attribute],
    };
  });

  importDataStore.gridInterfaceChange.loadConfig(settings, true);
  importDataStore.gridInterfaceChange.autoResizeColumns();

  // need to build map so we can find it fast
  const changeRowRefs = importDataStore.dataSourceChange.getAllData();
  changeRowRefs.forEach((row) => {
    changedRows.set(row["$$primaryKeyValue"], row);
  });

  importDataStore.gridInterfaceNew.loadConfig(defaultGridConfig, true);
  importDataStore.gridInterfaceNew
    .getDatasource()
    .setData(Array.from(newRows.values()));

  // need to rebuild map, so we have same object ref
  const newRowRefs = importDataStore.dataSourceNew.getAllData();
  newRowRefs.forEach((row) => {
    newRows.set(row["$dummyPrimary"], row);
  });

  importDataStore.gridInterfaceDeleted.loadConfig(defaultGridConfig, true);
  importDataStore.gridInterfaceDeleted
    .getDatasource()
    .setData(Array.from(deletedRows.values()));

  importDialogStore.getState().open();

  serviceStore.setState({
    loadingDataDialogActivated: false,
  });
}
