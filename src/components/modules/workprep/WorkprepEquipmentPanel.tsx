import { Splitter, SplitterPanel } from "primereact/splitter";
import { WorkprepCommonPanel } from "./WorkprepCommonPanel";

export function WorkprepEquipmentPanel() {
  return (
    <Splitter
      className="flex w-full h-full bg-inherit border-0"
      pt={{
        gutter: { className: "bg-gray-700" },
        gutterHandler: { className: "bg-gray-600" },
      }}
    >
      <SplitterPanel className="flex p-2" minSize={10} size={80}>
        todo
      </SplitterPanel>
      <SplitterPanel className="flex  overflow-hidden" minSize={0} size={20}>
        <WorkprepCommonPanel></WorkprepCommonPanel>
      </SplitterPanel>
    </Splitter>
  );
}
