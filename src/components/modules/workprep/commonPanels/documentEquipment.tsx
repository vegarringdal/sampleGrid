import { gridControllers } from "../../../../data/gridControllers";
import { SimpleGridActions } from "../../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../../common/grid/SimpleHtmlGrid";

export function DocumentEquipment() {
  return (
    <div className="p-2 flex w-full h-full">
      <SimpleGridActions gridController={gridControllers.documentsEquip} />
      <SimpleHtmlGrid
        id="2"
        className="simple-html-grid w-full h-full"
        interface={gridControllers.documentsEquip.getGridInterface()}
      />
    </div>
  );
}
