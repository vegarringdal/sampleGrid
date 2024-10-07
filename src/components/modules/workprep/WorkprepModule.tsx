import { TabView, TabPanel } from "primereact/tabview";
import { WorkprepCabelsPanel } from "./WorkprepCabelsPanel";
import { WorkprepEquipmentPanel } from "./WorkprepEquipmentPanel";

export function WorkprepModule() {
  return (
    <div className="flex flex-col h-full">
      <span className="p-2 text-xl dark:text-gray-200">Workprep - [PROJECT CODE]</span>
      <TabView
        pt={{
          panelContainer: {
            className: "h-full",
          }
        }}
        className="flex flex-col flex-1 text-xs"
      >
        <TabPanel
          header="Cables"
          className="h-full flex"
          pt={{
            headerAction: { className: "p-3" },
            content: { className: "h-full p-0" },
          }}
        >
          <WorkprepCabelsPanel />
        </TabPanel>
        <TabPanel
          header="Equipment"
          className="h-full"
          pt={{
            headerAction: { className: "p-3" },
            content: { className: "h-full p-0" },
          }}
        >
          <WorkprepEquipmentPanel />
        </TabPanel>
      </TabView>
    </div>
  );
}
