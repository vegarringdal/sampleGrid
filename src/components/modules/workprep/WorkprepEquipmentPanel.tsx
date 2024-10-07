import { Splitter, SplitterPanel } from "primereact/splitter";
import { WorkprepCommonPanel } from "./WorkprepCommonPanel";
import { gridInterface1 } from "../../../data/gridInterface1";
import { SimpleGridActions } from "../../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/SimpleHtmlGrid";

export function WorkprepEquipmentPanel() {
  return (
    <Splitter
    className="flex w-full h-full bg-inherit"
    pt={{
      root: {className: "border-0"},
      gutter: { className: "dark:bg-gray-700" },
      gutterHandler: { className: "dark:bg-gray-600" },
    }}
  >
    <SplitterPanel className="flex p-2" minSize={10} size={80}>
      <SimpleGridActions interface={gridInterface1} />
      <SimpleHtmlGrid
        id="1"
        className="simple-html-grid w-full h-full"
        interface={gridInterface1}
      />
    </SplitterPanel>
    <SplitterPanel className="flex  overflow-hidden" minSize={0} size={20}>
      <WorkprepCommonPanel></WorkprepCommonPanel>
    </SplitterPanel>
  </Splitter>
  );
}
