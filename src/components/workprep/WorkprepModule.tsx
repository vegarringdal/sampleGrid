import { TabView, TabPanel } from "primereact/tabview";
import { WorkprepCabelsPanel } from "./WorkprepCabelsPanel";
import { WorkprepEquipmentPanel } from "./WorkprepEquipmentPanel";

export function WorkprepModule() {
  return (
    <TabView
      className="flex flex-col flex-1 text-xs"
      panelContainerClassName="h-full p-0"
    >
      <TabPanel header="Cables" className="h-full">
        <WorkprepCabelsPanel />
      </TabPanel>
      <TabPanel header="Equipment" className="h-full">
        <WorkprepEquipmentPanel />
      </TabPanel>
    </TabView>
  );
}
