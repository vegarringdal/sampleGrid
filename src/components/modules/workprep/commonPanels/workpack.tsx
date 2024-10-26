import { Button } from "primereact/button";
import { gridControllers } from "../../../../data/gridControllers";
import { SimpleGridActions } from "../../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../../common/grid/SimpleHtmlGrid";

export function Workpack() {
  return (
    <div className="p-2 flex flex-col w-full h-full">
      <div className="flex flex-col">
        <div className="flex pl-2 pt-2 gap-2">
          <Button
            tooltip="Filters out based on selected, this uses loaded tag operations, so its important this is loaded"
            tooltipOptions={{ position: "top" }}
            className="m-auto"
            pt={{
              root: { className: "p-0 pl-1 pr-1 text-sm " },
            }}
            onClick={() => alert("not implemented")}
          >
            Filter Cable/Equipment
          </Button>
          <Button
            tooltip="Prints current workpack"
            tooltipOptions={{ position: "top" }}
            className="m-auto"
            pt={{
              root: { className: "p-0 pl-1 pr-1 text-sm " },
            }}
            onClick={() => alert("not implemented")}
          >
            Print
          </Button>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="p-2 flex w-full h-full">
        <SimpleGridActions gridController={gridControllers.workpack} />
        <SimpleHtmlGrid
          id="2"
          className="simple-html-grid w-full h-full"
          interface={gridControllers.workpack.getGridInterface()}
        />
      </div>
    </div>
  );
}
