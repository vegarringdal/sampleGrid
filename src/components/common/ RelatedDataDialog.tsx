import { relatedDialogStore } from "../../state/relatedDialogStore";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";
import { ResizableDialogContainer } from "./ResizableDialogContainer";
import { gridControllers } from "../../data/gridController";
import { useEffect } from "react";

/**
 * this is controlled by relatedDialogStore, to be loaded on application startup
 * dialog used by grid when displaying related data
 * @returns
 */
export function RelatedDataDialog() {
  const dataState = relatedDialogStore();

  useEffect(() => {
    function updateData() {
      if (!dataState.active) return;
      if (!dataState.fromSource) return;

      // just fetch if there isnt any data
      if (!gridControllers[dataState.fromSource].getGridDatasource().length()) {
        gridControllers[dataState.fromSource].requestRefresh();
      }
    }
    updateData();
  }, [dataState.active, dataState.fromSource]);

  if (!dataState.active) {
    return null;
  }

  if (!dataState.fromSource) {
    return null;
  }

  if (!dataState.toSource) {
    return null;
  }

  const gridInterface = gridControllers[dataState.fromSource].getGridInterface();
  return (
    <ResizableDialogContainer
      adjustOnLoad={true}
      uniqueName={`${dataState.fromSource}=>${dataState.toSource}`}
      title={dataState.title}
      isOpen={true}
      width={700}
      height={600}
      onClose={() => dataState.deactivateRelatedDialog()}
    >
      {/* CONTENT OF CONTAINER */}
      <div className="flex flex-col flex-1">
        <div className="mt-2 flex flex-grow">
          <SimpleHtmlGrid
            className="simple-html-grid flex-grow"
            interface={gridInterface}
          ></SimpleHtmlGrid>
        </div>

        <div className="bottom-2 left-0 right-0 mb-1 mt-1 flex">
          <div className="bottom-2 left-0 right-0 flex flex-1"></div>

          {/* RELOAD BUTTON */}

          <button
            className="ml-1 block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
            onClick={async () => {
              if (!dataState.fromSource) {
                return null;
              }

              gridControllers[dataState.fromSource].requestRefresh();
            }}
          >
            Reload
          </button>

          {/* SELECT BUTTON */}

          <button
            className="ml-1 block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
            onClick={() => {
              if (!dataState.fromSource) {
                return null;
              }

              if (!dataState.toSource) {
                return null;
              }
              
              const currentEntityFrom =  gridControllers[dataState.fromSource].getGridDatasource().currentEntity;

              if(!currentEntityFrom) {
                alert("select one first");
                return;
              }


              const currentEntityto =  gridControllers[dataState.toSource].getGridDatasource().currentEntity;
              

              // we need to update linked, but just the "to" part
              // maybe we also
              dataState.columnsFromTo?.forEach(([from, to]) => {
                if(!currentEntityFrom) return;
                if(!currentEntityto) return;

                currentEntityto[to] = currentEntityFrom[from];
               
              });


              dataState.deactivateRelatedDialog();

              //force rerendering
              gridControllers[dataState.toSource].getGridInterface().triggerScrollEvent();
              
            }}
          >
            Select
          </button>

          {/* CLOSE BUTTON */}

          <button
            className="ml-1 mr-1 block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
            onClick={() => dataState.deactivateRelatedDialog()}
          >
            Close
          </button>
        </div>
      </div>
    </ResizableDialogContainer>
  );
}
