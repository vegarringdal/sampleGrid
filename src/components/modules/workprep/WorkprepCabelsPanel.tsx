import { Splitter, SplitterPanel } from "primereact/splitter";

import { WorkprepCommonPanel } from "./WorkprepCommonPanel";
import { SimpleGridActions } from "../../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/SimpleHtmlGrid";
import { gridControllers } from "../../../data/gridController";

export function WorkprepCabelsPanel() {
  return (
    <Splitter
      className="flex w-full h-full bg-inherit"
      pt={{
        root: {className: "border-0"},
        gutter: { className: "dark:bg-gray-700" },
        gutterHandler: { className: "dark:bg-gray-600" },
      }}
    >
      <SplitterPanel className="flex p-2" minSize={10} size={60}>
        <SimpleGridActions dataController={gridControllers.cable} />
        <SimpleHtmlGrid
          id="1"
          className="simple-html-grid w-full h-full"
          interface={gridControllers.cable.getGridInterface()}
        />
      </SplitterPanel>
      <SplitterPanel className="flex  overflow-hidden" minSize={10} size={40}>
        <WorkprepCommonPanel></WorkprepCommonPanel>
      </SplitterPanel>
    </Splitter>
  );
}
