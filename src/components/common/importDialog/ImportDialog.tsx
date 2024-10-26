import { useState } from "react";
import { importDataStore } from "./importDataStore";
import { importDialogStore } from "../../../state/importDialogStore";
import { SimpleHtmlGrid } from "../grid/SimpleHtmlGrid";
import { ResizableDialogContainer } from "../resizableDialog/ResizableDialogContainer";
import { addImportedData } from "./addImportedData";
import { deleteSelectedRows } from "./deleteSelectedRows";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

/**
 * this is controlled by importDialogStore, to be loaded on application startup
 * data controller set dataState needed to open correct grid
 * @returns
 */
export function ImportDialog() {
  const state = importDialogStore();
  const [index, setindex] = useState<number>(0);
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
              header="All Changes"
              className="h-full flex"
              pt={{
                headerAction: { className: "p-3" },
                content: { className: "h-full p-2 flex w-full" },
              }}
            >
              <GridChange></GridChange>
            </TabPanel>

            <TabPanel
              header="New Rows"
              className="h-full flex"
              pt={{
                headerAction: { className: "p-3" },
                content: { className: "h-full p-2 flex w-full" },
              }}
            >
              <GridNew></GridNew>
            </TabPanel>

            <TabPanel
              header="Deleted Rows"
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

            <Button
              title="Open"
              pt={{
                root: { className: "p-1 text-sm m-2" },
              }}
              onClick={() => {
                deleteSelectedRows(reg);
              }}
            >
              Remove from import
            </Button>
            <Button
              title="Open"
              pt={{
                root: { className: "p-1 text-sm m-2" },
              }}
              onClick={() => {
                addImportedData();
              }}
            >
              Import into main grid
            </Button>

            <Button
              title="Open"
              pt={{
                root: { className: "p-1 text-sm m-2" },
              }}
              onClick={() => {
                state.close();
              }}
            >
              Close
            </Button>
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
