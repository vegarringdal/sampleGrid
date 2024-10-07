import { Splitter, SplitterPanel } from "primereact/splitter";
import { WorkprepCommonPanel } from "./WorkprepCommonPanel";

export function WorkprepEquipmentPanel() {
  return (
    <Splitter
      className="flex w-full h-full border-0"
      
    >
      <SplitterPanel className="flex" minSize={10} size={80}>
        todo
      </SplitterPanel>
      <SplitterPanel className="flex  overflow-hidden" minSize={0} size={20}>
        <WorkprepCommonPanel></WorkprepCommonPanel>
      </SplitterPanel>
    </Splitter>
  );
}
