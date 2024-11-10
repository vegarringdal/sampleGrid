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
    gridControllers.template.getGridDatasource(),
  );

  /**
   * filter out current template lines
   * for now I just inject to one with same desc
   */
  useEffect(() => {
    if (currentEntitytemplate) {
      //
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

      // create dummy map to hold temp data so we can inject it to same OPNO+OP as prev
      const opMap = new Map<
        string,
        {
          factor: string | null;
          task: string | null;
          workpack: string | null;
          quantity: number | null;
        }
      >();

      // update map
      existingRows.forEach((v) => {
        const id = v.opNo + "-" + v.op;
        opMap.set(id, {
          factor: v.factor,
          task: v.task,
          workpack: v.workpack,
          quantity: v.quantity,
        });
      });

      // filter rows from all entities based on the one we have selectd
      gridControllers.templateLinesAll.getGridDatasource().filter({
        attribute: "templateID",
        operator: "EQUAL",
        attributeType: "number",
        value: currentEntitytemplate.id,
      });

      // sort by opNo
      gridControllers.templateLinesAll
        .getGridDatasource()
        .sort({ attribute: "opNo", ascending: true });

      // gets filtered rows
      const rows = gridControllers.templateLinesAll
        .getGridDatasource()
        .getRows();

      // update user data
      rows.forEach((row) => {
        row.factor = opMap.get(row.opNo + "-" + row.op)?.factor || null;
        row.task = opMap.get(row.opNo + "-" + row.op)?.task || null;
        row.workpack = opMap.get(row.opNo + "-" + row.op)?.workpack || null;
        row.quantity = opMap.get(row.opNo + "-" + row.op)?.quantity || null;
      });

      // update current templine
      gridControllers.templateLineCurrent.getGridDatasource().setData(rows);

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

  /**
   * render
   */
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
          atm I hide some of the buttons I dont think is usefull here, so maybe scroll is not needed ?
          
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
