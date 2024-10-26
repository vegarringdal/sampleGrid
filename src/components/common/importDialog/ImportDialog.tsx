import { useState } from "react";
import { importDataStore } from "./importDataStore";
import { importDialogStore } from "../../../state/importDialogStore";
import { SimpleHtmlGrid } from "../SimpleHtmlGrid";
import { classes, classIfTrue } from "../../../utils/tailwindhelpers";
import { ResizableDialogContainer } from "../ResizableDialogContainer";
import { addImportedData } from "./addImportedData";
import { deleteSelectedRows } from "./deleteSelectedRows";

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
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
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
                deleteSelectedRows(reg);
              }}
            >
              Remove from import
            </button>

            {/* APPEND DATA BUTTON */}

            <button
              className="ml-1  block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
              onClick={() => {
                addImportedData();
                //close dialog
                state.close();
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


