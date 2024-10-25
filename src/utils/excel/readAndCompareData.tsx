import { openAndReadExcelFile } from "./openAndReadExcelFile";
import { read, utils } from "xlsx";
import { importDialogStore } from "../../state/importDialogStore";
import { importDataStore } from "../../state/importDataStore";



export async function readAndCompareData(usecontrollerName: string) {
    let data: any;
    try {
        data = await openAndReadExcelFile();
    } catch (e) {
        return;
    }

    if (!data) {
        return;
    }

    const apiName = getDataControllerByName(usecontrollerName).apiName;
    const apiConfig = getApiConfig(apiName);

    const apiColumns: Record<string, ApiColumn> = {};
    apiConfig.api.columns.forEach((e) => (apiColumns[e.name] = e));


    const dataController = getDataControllerByName(usecontrollerName);

    if (!apiConfig.apiRoles.UPDATE) {
        // if we cant update, then lets not allow anything
        alert("no access");
        return false;
    }

    // will keep data in maps when we compare
    const currentDataMap = new Map<string, any>();
    const importDataMap = new Map<string, any>();

    const newRows = importDataStore.newRows;
    newRows.clear();

    const deletedRows = importDataStore.deletedRows;
    deletedRows.clear();

    const changedRows = importDataStore.changedRows;
    changedRows.clear();

    const changeSet: any = [];

    const dsRows = dataController.dataSource.getRows(true);
    const gridConfig = dataController.gridInterface.saveConfig();
    const updatableColumns = new Set(apiConfig.apiRoles.UPDATABLE_COLUMNS);
    const gridColumns = new Set(dataController.gridInterface.getOptionalAttributes());
    gridColumns.forEach((att) => {
        if (updatableColumns.has(att)) {
            updatableColumns.delete(att);
        }
    });
    const dateColumns = new Set(gridConfig.attributes.filter((e) => e.type === "date").map((e) => e.attribute));
    const numberColumns = new Set(gridConfig.attributes.filter((e) => e.type === "number").map((e) => e.attribute));
    const booleanColumns = new Set(gridConfig.attributes.filter((e) => e.type === "boolean").map((e) => e.attribute));
    const canDelete = apiConfig.apiRoles.DELETE;
    const canInsert = apiConfig.apiRoles.INSERT;
    const primaryKeyName = apiConfig.api.primaryKey;
    const importColumns = apiConfig.api.importColumns;

    // update so we can use this in dialog later
    importDataStore.primaryKeyName = primaryKeyName;
    importDataStore.currentcontrollerName = usecontrollerName;

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
        const primaryKeyValue = row[primaryKeyName];
        if (primaryKeyValue) {
            currentDataMap.set(primaryKeyValue, row);
        }
    });

    const workbook = read(data, { type: "array", cellDates: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const userData = utils.sheet_to_json(sheet, { raw: true, defval: null });

    let newRowCount = 0;
    userData.forEach((row: any) => {
        const primaryKeyValue = row[primaryKeyName];
        if (primaryKeyValue && currentDataMap.has(primaryKeyValue)) {
            importDataMap.set(primaryKeyValue, row);
        } else {
            newRowCount++;
            row[primaryKeyName] = "new-row:" + newRowCount;
            importDataMap.set("new-row:" + newRowCount, row);
        }
    });

    if (canInsert) {
        importDataMap.forEach((row: any, primaryKeyValue) => {
            if (!currentDataMap.has(primaryKeyValue)) {
                row.$dummyPrimary = primaryKeyValue;
                newRows.set(primaryKeyValue, row);

                const changeRow = {
                    primaryKeyName: primaryKeyName,
                    columnDataType: getDataType(primaryKeyName),
                    changeType: "New",
                    primaryKeyValue,
                    columnChanged: "NA",
                    oldValue: "NA",
                    newValue: "NA"
                } as any;

                if (importColumns && Array.isArray(importColumns.$columnOrder)) {
                    importColumns.$columnOrder.forEach((name) => {
                        changeRow[name] = row[name];
                    });
                }

                changeSet.push(changeRow);
            }
        });
    }

    currentDataMap.forEach((currentData: any) => {
        const primaryKeyValue = currentData[primaryKeyName];
        const importData = importDataMap.get(primaryKeyValue);

        if (!importData) {
            if (canDelete) {
                deletedRows.set(primaryKeyValue, currentData);

                const changeRow: Record<string, any> = {
                    primaryKeyName: primaryKeyName,
                    columnDataType: getDataType(primaryKeyName),
                    changeType: "Deleted",
                    primaryKeyValue,
                    columnChanged: "NA",
                    oldValue: "NA",
                    newValue: "NA"
                };

                if (importColumns && Array.isArray(importColumns.$columnOrder)) {
                    importColumns.$columnOrder.forEach((name) => {
                        changeRow[name] = currentData[name];
                    });
                }

                changeSet.push(changeRow);
            }
        } else {
            updatableColumns.forEach((column) => {
                let newValue = importData[column] || "";
                const oldValue = currentData[column] || "";

                const columnDataType = getDataType(column);
                let changeRow: Record<string, any> = null as any;

                switch (columnDataType) {
                    case "date":
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
                                primaryKeyName: primaryKeyName,
                                columnDataType,
                                changeType: "Change",
                                primaryKeyValue,
                                columnChanged: column,
                                oldValue: currentData[column],
                                newValue: new Date(
                                    importData[column].setHours(importData[column].getHours() - timezoneOffset)
                                )
                            };
                        }

                        break;
                    case "number":
                        let vOldValue = oldValue;
                        if (newValue === 0 || newValue === "0") {
                            newValue = "";
                        }
                        if (vOldValue === 0 || vOldValue === "0") {
                            vOldValue = "";
                        }

                        if (vOldValue !== newValue) {
                            changeRow = {
                                primaryKeyName: primaryKeyName,
                                columnDataType,
                                changeType: "Change",
                                primaryKeyValue,
                                columnChanged: column,
                                oldValue: currentData[column],
                                newValue: importData[column]
                            };
                        }
                        break;
                    case "boolean":
                        const trueBoolValue = apiColumns[column].checkboxChecked;
                        const falseBoolValue = apiColumns[column].checkboxUnchecked;
                        let vNewValue = newValue === trueBoolValue;
                        let vOldValueBool = oldValue;

                        // need to change the bool value to fix how config is set

                        if (vOldValueBool === true) {
                            vOldValueBool = trueBoolValue;
                        }

                        if (vOldValueBool === false || vOldValueBool === null || vOldValueBool === "") {
                            vOldValueBool = falseBoolValue;
                        }

                        vOldValueBool = vOldValueBool !== falseBoolValue;
                        if (vOldValueBool !== vNewValue) {
                            changeRow = {
                                primaryKeyName: primaryKeyName,
                                columnDataType,
                                changeType: "Change",
                                primaryKeyValue,
                                columnChanged: column,
                                oldValue: vOldValueBool === true ? trueBoolValue : falseBoolValue,
                                newValue: vNewValue === true ? trueBoolValue : falseBoolValue
                            };
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
                                primaryKeyName: primaryKeyName,
                                columnDataType,
                                changeType: "Change",
                                primaryKeyValue,
                                columnChanged: column,
                                oldValue,
                                newValue
                            };
                        }
                    }
                }

                if (changeRow) {
                    if (importColumns && Array.isArray(importColumns.$columnOrder)) {
                        importColumns.$columnOrder.forEach((name) => {
                            changeRow[name] = currentData[name];
                        });
                    }

                    changeSet.push(changeRow);
                }
            });
        }
    });

    const defaultGridConfig = getDataControllerByName(usecontrollerName).gridInterface.saveConfig();

    importDataStore.gridInterfaceChange.getDatasource().setData(changeSet);

    const defaultChangeColumns: any[] = JSON.parse(JSON.stringify(importDataStore.defaultChangeColumns)); // intentinally skipped structuredClone

    // add additional columns if any
    const settings = importDataStore.gridInterfaceChange.saveConfig();
    if (importColumns && Array.isArray(importColumns.$columnOrder)) {
        importColumns.$columnOrder.reverse().forEach((name) => {
            defaultChangeColumns.splice(1, 0, {
                label: importColumns[name],
                attribute: name
            });
        });
    }

    settings.attributes = defaultChangeColumns;
    settings.columnsCenter = defaultChangeColumns.map((e) => {
        return {
            width: 200,
            rows: [e.attribute]
        };
    });

    importDataStore.gridInterfaceChange.loadConfig(settings, true);
    importDataStore.gridInterfaceChange.autoResizeColumns();

    // need to build map so we can find it fast
    const changeRowRefs = importDataStore.dataSourceChange.getAllData();
    changeRowRefs.forEach((row) => {
        changedRows.set(row["primaryKeyValue"], row);
    });

    importDataStore.gridInterfaceNew.loadConfig(defaultGridConfig, true);
    importDataStore.gridInterfaceNew.getDatasource().setData(Array.from(newRows.values()));

    // need to rebuild map, so we have same object ref
    const newRowRefs = importDataStore.dataSourceNew.getAllData();
    newRowRefs.forEach((row) => {
        newRows.set(row["$dummyPrimary"], row);
    });

    importDataStore.gridInterfaceDeleted.loadConfig(defaultGridConfig, true);
    importDataStore.gridInterfaceDeleted.getDatasource().setData(Array.from(deletedRows.values()));

    importDialogStore.getState().open();
}
