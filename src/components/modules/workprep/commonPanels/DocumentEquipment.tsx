import { Button } from "primereact/button";
import { gridControllers } from "../../../../data/gridControllers";
import { SimpleGridActions } from "../../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../../common/grid/SimpleHtmlGrid";

export function DocumentEquipment() {
  return (
    <div className="p-2 flex flex-col w-full h-full">
      <div className="flex flex-col">
        <div className="flex pl-2 pt-2 gap-2">
          <Button
            tooltip="Filters out based on selected"
            tooltipOptions={{ position: "top" }}
            className="m-auto"
            pt={{
              root: { className: "p-0 pl-1 pr-1 text-sm " },
            }}
            onClick={() => alert("not implemented")}
          >
            Filter Equipment
          </Button>
          <Button
            tooltip="Filters document from selected equipment"
            tooltipOptions={{ position: "top" }}
            className="m-auto"
            pt={{
              root: { className: "p-0 pl-1 pr-1 text-sm " },
            }}
            onClick={() => alert("not implemented")}
          >
            Filter Documents
          </Button>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="p-2 flex w-full h-full">
        <SimpleGridActions gridController={gridControllers.documentsEquip} />
        <SimpleHtmlGrid
          id="2"
          className="simple-html-grid w-full h-full"
          interface={gridControllers.documentsEquip.getGridInterface()}
        />
      </div>
    </div>
  );
}
