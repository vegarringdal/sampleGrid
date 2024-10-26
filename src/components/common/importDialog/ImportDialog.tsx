import { useState } from "react";
import { importDataStore } from "./importDataStore";
import { importDialogStore } from "../../../state/importDialogStore";
import { SimpleHtmlGrid } from "../SimpleHtmlGrid";
import { ResizableDialogContainer } from "../ResizableDialogContainer";
import { addImportedData } from "./addImportedData";
import { deleteSelectedRows } from "./deleteSelectedRows";
import { TabView, TabPanel } from "primereact/tabview";

/**
 * this is controlled by importDialogStore, to be loaded on application startup
 * data controller set dataState needed to open correct grid
 * @returns
 */
export function ImportDialog() {
  const state = importDialogStore();
  const [index, setindex] = useState<number>(1);
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
        <div className="flex flex-col flex-1 pt-2">
          <TabView
            activeIndex={index}
            pt={{
              panelContainer: {
                className: "h-full flex",
              },
            }}
            onTabChange={(e) => {
              if (e.index === 0) {
                setindex(e.index);
                setReg("change");
              }
              if (e.index === 1) {
                setindex(e.index);
                setReg("new");
              }
              if (e.index === 2) {
                setindex(e.index);
                setReg("deleted");
              }
            }}
            className="flex flex-col flex-1 text-xs"
          >
            <TabPanel
              header="Cables"
              className="h-full flex"
              pt={{
                headerAction: { className: "p-3" },
                content: { className: "h-full p-2 flex w-full" },
              }}
            >
              <GridChange></GridChange>
            </TabPanel>

            <TabPanel
              header="Cables"
              className="h-full flex"
              pt={{
                headerAction: { className: "p-3" },
                content: { className: "h-full p-2 flex w-full" },
              }}
            >
              <GridNew></GridNew>
            </TabPanel>

            <TabPanel
              header="Equipment"
              className="h-full flex"
              pt={{
                headerAction: { className: "p-3" },
                content: { className: "h-full p-2 flex w-full" },
              }}
            >
              <GridDeleted></GridDeleted>
            </TabPanel>
          </TabView>

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
