import { Splitter, SplitterPanel } from "primereact/splitter";
import { gridControllers } from "../../../../data/gridControllers";
import { SimpleGridActions } from "../../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../../common/grid/SimpleHtmlGrid";
import { Button } from "primereact/button";
import { useCurrentEntity } from "../../../../data/common/useCurrentEntity";
import { useEffect } from "react";
import { TemplateEntity } from "../../../../data/entities/TemplateEntity";

export function CreatetagOperations() {
  const currentEntitytemplate = useCurrentEntity<TemplateEntity>(
    gridControllers.template.getGridDatasource()
  );

  /**
   * filter out current template lines
   * for now I just inject to one with same desc
   */
  useEffect(() => {
    // here we can filter out corret one based on selected
    // we also need to get current and extract value sin task/workpack

    if (currentEntitytemplate) {
      gridControllers.templateLineCurrent.getGridDatasource().setData([
        {
          id: 1,
          desc: "PU... todo update gridcontroller etc",
        },
        {
          id: 2,
          desc: "TF... todo update gridcontroller etc",
        },
        {
          id: 3,
          desc: "TT... todo update gridcontroller etc",
        },
        {
          id: 4,
          desc: "TC... todo update gridcontroller etc",
        },
      ]);
    } else {
      gridControllers.templateLineCurrent.getGridDatasource().setData([]);
    }
  }, [currentEntitytemplate]);

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
        onResizeEnd={() => {
          if (window.getSelection) {
            window.getSelection()?.removeAllRanges();
          }
        }}
      >
        <SplitterPanel
          className="flex flex-col p-2 flex-1"
          minSize={10}
          size={60}
        >
          <div className="flex flex-col">
            <span className="text-base p-1">Templates</span>
            <div className="flex pl-2">
              <Button
                tooltip="Create a duplicate with template lines from current"
                tooltipOptions={{ position: "top" }}
                className="m-auto"
                pt={{
                  root: { className: "p-0 pl-1 pr-1 text-sm " },
                }}
                onClick={() => alert("not implemented")}
              >
                Duplicate with template lines
              </Button>
              <div className="flex-1"></div>
            </div>
          </div>

          <div className="p-2 flex w-full h-full">
            <SimpleGridActions gridController={gridControllers.template} />
            {/* 
          
                TODO, memo this, niticed it looses focus when curent entity hook triggers ?
          
          */}
            <SimpleHtmlGrid
              id="2"
              className="simple-html-grid w-full h-full"
              interface={gridControllers.template.getGridInterface()}
            />
          </div>
        </SplitterPanel>

        <SplitterPanel
          className="flex  flex-col  p-2 ml-1"
          minSize={10}
          size={40}
        >
          {/* 
          
          TODO, maybe add scroll or hide option ? 
          
          */}
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
            <SimpleGridActions
              hideButton={{ export: true, import: true, refresh: true }}
              gridController={gridControllers.templateLineCurrent}
            />
            <SimpleHtmlGrid
              id="2"
              className="simple-html-grid w-full h-full"
              interface={gridControllers.templateLineCurrent.getGridInterface()}
            />
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
