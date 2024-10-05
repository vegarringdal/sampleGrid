import "./App.css";
import { SetGridTheme } from "./components/SetGridTheme";
import { TabPanel, TabView } from "primereact/tabview";
import { PrimeReactProvider } from "primereact/api";
import { Menubar } from "primereact/menubar";
import { WorkprepCabelsPanel } from "./components/WorkprepCabelsPanel";
import { WorkprepEquipmentPanel } from "./components/WorkprepEquipmentPanel";

////////////////////////////////////////////////////////////////////////
// PS!
// Will be a lot of junk here when Im trying out primereact
////////////////////////////////////////////////////////////////////////

export function App() {
  return (
    <div className="app flex flex-col flex-1  bg-gray-800">
      <PrimeReactProvider>
        <Menubar model={[]} className="border-0 rounded-none" />
        <SetGridTheme enabled={true} />
        <div className="w-full flex flex-1">
          <TabView
            className="flex flex-col flex-1 text-xs"
            panelContainerClassName="h-full p-0"
          >
            <TabPanel header="Cables" className="h-full">
              <WorkprepCabelsPanel></WorkprepCabelsPanel>
            </TabPanel>
            <TabPanel header="Equipment" className="h-full">
              <WorkprepEquipmentPanel></WorkprepEquipmentPanel>
            </TabPanel>
          </TabView>
        </div>
        <Menubar model={[]} className="border-0 rounded-none" />
      </PrimeReactProvider>
    </div>
  );
}
