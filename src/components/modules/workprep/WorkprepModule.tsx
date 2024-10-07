import { TabView, TabPanel } from "primereact/tabview";
import { WorkprepCabelsPanel } from "./WorkprepCabelsPanel";
import { WorkprepEquipmentPanel } from "./WorkprepEquipmentPanel";


export function WorkprepModule() {
  return (
    <div className="flex flex-col h-full">
      <span className="p-2 text-xl">Workprep - [PROJECT CODE]</span>
      <TabView
        className="flex flex-col flex-1 text-xs"
        panelContainerClassName="h-full p-0"
      >
        <TabPanel
          header="Cables"
          className="h-full"
          pt={{ headerAction: { className: "p-3" } }}
        >
          <WorkprepCabelsPanel />
        </TabPanel>
        <TabPanel
          header="Equipment"
          className="h-full"
          pt={{ headerAction: { className: "p-3" } }}
        >
          <WorkprepEquipmentPanel />
        </TabPanel>
      </TabView>
    </div>
  );
}
