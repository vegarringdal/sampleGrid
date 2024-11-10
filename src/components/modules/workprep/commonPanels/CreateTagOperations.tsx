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
    if (currentEntitytemplate) {
      // get existing row, so we can collect parts user have set, so we can reuse it
      const existingRows = gridControllers.templateLineCurrent
        .getGridDatasource()
        .getAllData();

      // get seleted so we can highlight same rows
      // use rows or OP code ?
      const selectedRows = gridControllers.templateLineCurrent
        .getGridDatasource()
        .getSelection()
        .getSelectedRows();

      const opMap = new Map<
        string,
        {
          factor: string | null;
          task: string | null;
          workpack: string | null;
          quantity: number | null;
        }
      >();

      existingRows.forEach((v) => {
        const id = v.opNo + "-" + v.op;
        opMap.set(id, {
          factor: v.factor,
          task: v.task,
          workpack: v.workpack,
          quantity: v.quantity,
        });
      });

      // todo, here we would need to filter out correct row, not use dummy data like I do here

      gridControllers.templateLineCurrent.getGridDatasource().setData([
        {
          id: 1,
          op: "PU",
          opNo: 1,
          factor: opMap.get(1 + "-PU")?.factor,
          task: opMap.get(1 + "-PU")?.task,
          workpack: opMap.get(1 + "-PU")?.workpack,
          quantity: opMap.get(1 + "-PU")?.quantity,
          compcode: "J01020382" + Math.random() * 10,
          compDesc: "Pull ... blabla",
        },
        {
          id: 2,
          op: "TF",
          opNo: 2,
          factor: opMap.get(2 + "-TF")?.factor,
          task: opMap.get(2 + "-TF")?.task,
          workpack: opMap.get(2 + "-TF")?.workpack,
          quantity: opMap.get(2 + "-TF")?.quantity,
          compcode: "J01020383" + Math.random() * 10,
          compDesc: "Term ... blabla",
        },
        {
          id: 3,
          op: "TT",
          opNo: 3,
          factor: opMap.get(3 + "-TT")?.factor,
          task: opMap.get(3 + "-TT")?.task,
          workpack: opMap.get(3 + "-TT")?.workpack,
          quantity: opMap.get(3 + "-TT")?.quantity,
          compcode: "J01020383" + Math.random() * 10,
          compDesc: "Term ... blabla",
        },
        {
          id: 4,
          op: "TC",
          opNo: 4,
          factor: opMap.get(4 + "-TC")?.factor,
          task: opMap.get(4 + "-TC")?.task,
          workpack: opMap.get(4 + "-TC")?.workpack,
          quantity: opMap.get(4 + "-TC")?.quantity,
          compcode: "J01020384" + Math.random() * 10,
          compDesc: "Test ... blabla",
        },
      ]);

      // highlight same rows
      // todo, maybe add a setSelectedRows method ?
      selectedRows.forEach((r) => {
        gridControllers.templateLineCurrent
          .getGridDatasource()
          .getSelection()
          .selectRowRange(r, r, true);
      });
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
          root: { className: "border-0" },
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
            <SimpleGridActions
              gridController={gridControllers.template}
              hideButton={{ duplicate: true, export: true, import: true }}
            />
            {/* 
          
                TODO, memo this, noticed it looses focus when curent entity hook triggers ?
          
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
