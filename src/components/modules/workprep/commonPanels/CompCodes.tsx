import { gridControllers } from "../../../../data/gridControllers";
import { SimpleGridActions } from "../../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../../common/grid/SimpleHtmlGrid";

export function CompCodes() {
  return (
    <div className="p-2 flex flex-col w-full h-full">
      <div className="flex flex-col">
        <div className="flex pl-2 pt-2 gap-2">{/* nothing atm */}</div>
      </div>
      <div className="p-2 flex w-full h-full">
        <SimpleGridActions gridController={gridControllers.compcodes} />
        <SimpleHtmlGrid
          id="2"
          className="simple-html-grid w-full h-full"
          interface={gridControllers.compcodes.getGridInterface()}
        />
      </div>
    </div>
  );
}
