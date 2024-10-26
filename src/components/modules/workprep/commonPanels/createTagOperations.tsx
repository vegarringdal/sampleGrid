import { Splitter, SplitterPanel } from "primereact/splitter";
import { gridControllers } from "../../../../data/gridControllers";
import { SimpleGridActions } from "../../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../../common/grid/SimpleHtmlGrid";
import { Button } from "primereact/button";

export function CreatetagOperations() {
  return (
    <div className="flex flex-col h-full">
      <Splitter
        layout="vertical"
        className="flex w-full h-full bg-inherit"
        pt={{
          root: { className: "border-" },
          gutter: { className: "dark:bg-gray-600" },
          gutterHandler: { className: "dark:bg-gray-700" },
        }}
      >
        <SplitterPanel
          className="flex flex-col p-2 flex-1"
          minSize={10}
          size={60}
        >
          <span className="text-base">Templates</span>
          <div className="p-2 flex w-full h-full">
            <SimpleGridActions gridController={gridControllers.template} />
            <SimpleHtmlGrid
              id="2"
              className="simple-html-grid w-full h-full"
              interface={gridControllers.template.getGridInterface()}
            />
          </div>
        </SplitterPanel>

        <SplitterPanel
          className="flex  flex-col overflow-y-auto scrollbar p-2 ml-1"
          minSize={10}
          size={40}
        >
          <div className="flex flex-col">
            <span className="text-base p-1">Template Lines</span>
            <div className="flex pl-2">
              <Button
                tooltip="Creates out based on selected template lines and cable/or equipment tab"
                tooltipOptions={{ position: "top" }}
                className="m-auto"
                pt={{
                  root: { className: "p-0 pl-1 pr-1 text-sm " },
                }}
                onClick={() => alert("not implemented")}
              >
                Create Tag operations
              </Button>
              <div className="flex-1"></div>
            </div>
          </div>

          <div className="p-2 flex w-full h-full">
            <SimpleGridActions gridController={gridControllers.templateLines} />
            <SimpleHtmlGrid
              id="2"
              className="simple-html-grid w-full h-full"
              interface={gridControllers.templateLines.getGridInterface()}
            />
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
