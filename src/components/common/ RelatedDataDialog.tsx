import { relatedDialogStore } from "../../state/relatedDialogStore";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";
import { ResizableDialogContainer } from "./ResizableDialogContainer";
import { sources } from "../../data/sources";

/**
 * this is controlled by relatedDialogStore, to be loaded on application startup
 * dialog used by grid when displaying related data
 * @returns
 */
export function RelatedDataDialog() {
  const dataState = relatedDialogStore();

  if (!dataState.active) {
    return null;
  }

  if (!dataState.fromSource) {
    return null;
  }

  if (!dataState.toSource) {
    return null;
  }

  const gridInterface = sources[dataState.fromSource].getGridInterface();
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
              alert("reload not implemented");
            }}
          >
            Reload
          </button>

          {/* SELECT BUTTON */}

          <button
            className="ml-1 block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
            onClick={() => {
              /**
               * we now need to update values in datasource called
               */
              alert("select not implemented");
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
