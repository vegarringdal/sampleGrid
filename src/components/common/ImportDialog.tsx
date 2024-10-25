import { useState } from "react";
import { importDataStore } from "../../state/importDataStore";
import { importDialogStore } from "../../state/importDialogStore";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";
import { classes, classIfTrue } from "../../utils/tailwindhelpers";
import { ResizableDialogContainer } from "./ResizableDialogContainer";

/**
 * this is controlled by importDialogStore, to be loaded on application startup
 * data controller set dataState needed to open correct grid
 * @returns
 */
export function ImportDialog() {
  const state = importDialogStore();
  const [reg, setReg] = useState<"change" | "new" | "deleted">("change");

  if (!state.activated) {
    return null;
  }

  return (
    <div className="fadeIn fadeIn fixed top-0  z-[6001] grid h-full w-full items-center justify-center bg-gray-50/50">
      <ResizableDialogContainer
        adjustOnLoad={true}
        uniqueName={`import`}
        title={"Import data"}
        isOpen={true}
        width={700}
        height={600}
        onClose={() => state.close()}
      >
        <div className="flex flex-col flex-1">
          <div className="mb-1 mt-1 flex">
            <button
              className={classes([
                /* Defaults */
                "ml-1 w-36 p-2 font-semibold focus:outline-none",
                "hover:bg-gray-400 dark:hover:bg-gray-600",
                "text-indigo-600 dark:text-blue-400",

                /* selected */
                classIfTrue(
                  reg === "change",
                  "block bg-gray-400 dark:bg-gray-500 dark:text-gray-900"
                ),

                /* not selected */
                classIfTrue(
                  reg !== "change",
                  "block bg-gray-300 dark:bg-gray-700 dark:text-blue-400"
                ),
              ])}
              onClick={() => setReg("change")}
            >
              All Changes
            </button>

            <button
              className={classes([
                /* Defaults */
                "ml-1 w-36 p-2 font-semibold focus:outline-none",
                "hover:bg-gray-400 dark:hover:bg-gray-600",
                "text-indigo-600 dark:text-blue-400",

                /* selected */
                classIfTrue(
                  reg === "new",
                  "block bg-gray-400 dark:bg-gray-500 dark:text-gray-900"
                ),

                /* not selected */
                classIfTrue(
                  reg !== "new",
                  "block bg-gray-300 dark:bg-gray-700 dark:text-blue-400"
                ),
              ])}
              onClick={() => setReg("new")}
            >
              New Rows
            </button>

            <button
              className={classes([
                /* Defaults */
                "ml-1 w-36 p-2 font-semibold focus:outline-none",
                "hover:bg-gray-400 dark:hover:bg-gray-600",
                "text-indigo-600 dark:text-blue-400",

                /* selected */
                classIfTrue(
                  reg === "deleted",
                  "block bg-gray-400 dark:bg-gray-500 dark:text-gray-900"
                ),

                /* not selected */
                classIfTrue(
                  reg !== "deleted",
                  "block bg-gray-300 dark:bg-gray-700 dark:text-blue-400"
                ),
              ])}
              onClick={() => setReg("deleted")}
            >
              Deleted Rows
            </button>
          </div>

          <div className="flex flex-grow">
            <GridType gridtype={reg}></GridType>
          </div>

          <div className="bottom-2 left-0 right-0 mb-1 mt-1 flex">
            <div className="bottom-2 left-0 right-0 flex flex-1"></div>

            {/* DELETE SELECTED ROWS */}

            <button
              className="ml-1  block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
              onClick={async () => {
                if (reg === "change") {
                  const selectedRows = importDataStore.gridInterfaceChange
                    .getDatasource()
                    .getSelectedRows();

                  const changeRowsToRemove: Record<string, unknown>[] = [];
                  const deletedRowsToRemove: Record<string, unknown>[] = [];
                  const newRowsToRemove: Record<string, unknown>[] = [];

                  selectedRows.forEach((entity: Record<string, unknown>) => {
                    // we need to keep new adn deleted row map in sync..
                    // maybe I should do this after ?
                    const primaryKey = entity.primaryKeyValue;
                    const changeType = entity.changeType;

                    if (changeType === "Deleted") {
                      const row = importDataStore.deletedRows.get(primaryKey);
                      if (row) {
                        deletedRowsToRemove.push(row);
                        importDataStore.deletedRows.delete(primaryKey);
                      }
                    }

                    if (changeType === "New") {
                      const row = importDataStore.newRows.get(primaryKey);
                      if (row) {
                        newRowsToRemove.push(row);
                        importDataStore.newRows.delete(primaryKey);
                      }
                    }

                    changeRowsToRemove.push(entity);
                  });

                  importDataStore.gridInterfaceDeleted
                    .getDatasource()
                    .markForDeletion(deletedRowsToRemove);
                  importDataStore.gridInterfaceNew
                    .getDatasource()
                    .markForDeletion(newRowsToRemove);
                  importDataStore.gridInterfaceChange
                    .getDatasource()
                    .markForDeletion(changeRowsToRemove);
                }

                if (reg === "new") {
                  const selectedRows = importDataStore.gridInterfaceNew
                    .getDatasource()
                    .getSelectedRows();

                  const changeRowsToRemove: Record<string, unknown>[] = [];
                  const newRowsToRemove: Record<string, unknown>[] = [];

                  selectedRows.forEach((entity: Record<string, unknown>) => {
                    const primaryKey = entity["$dummyPrimary"];

                    {
                      const row = importDataStore.changedRows.get(primaryKey);
                      if (row) {
                        changeRowsToRemove.push(row);
                        importDataStore.changedRows.delete(primaryKey);
                        importDataStore.newRows.delete(primaryKey);
                      }
                    }

                    newRowsToRemove.push(entity);
                  });

                  importDataStore.gridInterfaceNew
                    .getDatasource()
                    .markForDeletion(newRowsToRemove);
                  importDataStore.gridInterfaceChange
                    .getDatasource()
                    .markForDeletion(changeRowsToRemove);
                }

                if (reg === "deleted") {
                  const selectedRows = importDataStore.gridInterfaceDeleted
                    .getDatasource()
                    .getSelectedRows();

                  const changeRowsToRemove: Record<string, unknown>[] = [];
                  const deletedRowsToRemove: Record<string, unknown>[] = [];

                  selectedRows.forEach((entity: Record<string, unknown>) => {
                    const primaryKey = entity[importDataStore.primaryKeyName];

                    {
                      const row = importDataStore.changedRows.get(primaryKey);
                      if (row) {
                        changeRowsToRemove.push(row);
                        importDataStore.changedRows.delete(primaryKey);
                        importDataStore.deletedRows.delete(primaryKey);
                      }
                    }

                    deletedRowsToRemove.push(entity);
                  });

                  importDataStore.gridInterfaceDeleted
                    .getDatasource()
                    .markForDeletion(deletedRowsToRemove);
                  importDataStore.gridInterfaceChange
                    .getDatasource()
                    .markForDeletion(changeRowsToRemove);
                }
              }}
            >
              Remove from import
            </button>

            {/* APPEND DATA BUTTON */}

            <button
              className="ml-1  block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
              onClick={() => {
                // loop controllerName and make primary key map
                const inputGridController = importDataStore.currentGridController;
                const dsRows = inputGridController
                  .getGridDatasource()
                  .getRows(true);
                const primaryKeyName = importDataStore.primaryKeyName;
                const primaryKeyMap = new Map<
                  unknown,
                  Record<string, unknown>
                >();
                dsRows.forEach((row) => {
                  primaryKeyMap.set(row[primaryKeyName], row);
                });

                // loop changeset
                const changeSet =
                  importDataStore.dataSourceChange.getRows(true);
                changeSet.forEach((row) => {
                  const controllerNameRow = primaryKeyMap.get(
                    row.primaryKeyValue
                  );
                  if (controllerNameRow) {
                    controllerNameRow[row.columnChanged] = row.newValue;
                  }
                });

                // if change -> get row from primary key map and update
                const deletedRows = importDataStore.deletedRows;
                const toMarkAsDeleted: unknown[] = [];
                deletedRows.forEach((_, primarykey) => {
                  toMarkAsDeleted.push(primaryKeyMap.get(primarykey));
                });
                inputGridController
                  .getGridDatasource()
                  .markForDeletion(toMarkAsDeleted);

                const newRows = importDataStore.newRows;

                // todo: there is room for improvement in guitools and grid on this part

                newRows.forEach((row) => {
                  // to not trigger events in grid etc we go directly to datacontainer
                  const result = inputGridController
                    .getGridDatasource()
                    .setData([{}], true, true);
                  if (Array.isArray(result)) {
                    const x = result[0] as Record<string, unknown>;
                    const c = JSON.parse(JSON.stringify(row));

                    // we want to register change/let it go through our entity handler, so columns act correctly in grid
                    const keys = Object.keys(c);
                    keys.forEach((key) => {
                      x[key] = c[key];
                    });
                  }
                });

                state.close();

                //set state to edit mode
              }}
            >
              Update grid with data
            </button>

            {/* CLOSE BUTTON */}

            <button
              className="ml-1  mr-1 block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
              onClick={() => state.close()}
            >
              Close
            </button>
          </div>
        </div>
      </ResizableDialogContainer>
    </div>
  );
}

/**
 * helper for grid type
 * @param props
 * @returns
 */
function GridType(props: { gridtype: "new" | "change" | "deleted" }) {
  if (props.gridtype === "deleted") {
    return <GridDeleted></GridDeleted>;
  }

  if (props.gridtype === "new") {
    return <GridNew></GridNew>;
  }

  return <GridChange></GridChange>;
}

// needed to split into own to force rerender

function GridNew() {
  return (
    <SimpleHtmlGrid
      className="simple-html-grid flex-grow"
      date={new Date()}
      interface={importDataStore.gridInterfaceNew}
    ></SimpleHtmlGrid>
  );
}

function GridChange() {
  return (
    <SimpleHtmlGrid
      className="simple-html-grid flex-grow"
      date={new Date()}
      interface={importDataStore.gridInterfaceChange}
    ></SimpleHtmlGrid>
  );
}

function GridDeleted() {
  return (
    <SimpleHtmlGrid
      className="simple-html-grid flex-grow"
      date={new Date()}
      interface={importDataStore.gridInterfaceDeleted}
    ></SimpleHtmlGrid>
  );
}
