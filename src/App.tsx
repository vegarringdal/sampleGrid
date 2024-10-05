import "./App.css";
import { SetGridTheme } from "./components/SetGridTheme";
import { SimpleGridActions } from "./components/SimpleGridActions";
import { SimpleHtmlGrid } from "./components/SimpleHtmlGrid";
import { gridInterface1 } from "./state/gridInterface1";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabView, TabPanel } from "primereact/tabview";
import { PrimeReactProvider } from "primereact/api";
import { Menubar } from "primereact/menubar";
import { gridInterface2 } from "./state/gridInterface2";

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
              <Splitter
                className="flex w-full h-full bg-inherit border-0"
                pt={{
                  gutter: { className: "bg-gray-700" },
                  gutterHandler: { className: "bg-gray-600" },
                }}
              >
                <SplitterPanel className="flex p-2" minSize={10} size={80}>
                  <SimpleGridActions interface={gridInterface1} />
                  <SimpleHtmlGrid
                    id='1'
                    className="simple-html-grid w-full h-full"
                    interface={gridInterface1}
                  />
                </SplitterPanel>
                <SplitterPanel
                  className="flex  overflow-hidden"
                  minSize={0}
                  size={20}
                >
                  <TabView
                      className="flex flex-col flex-1 text-xs"
                      panelContainerClassName="h-full p-0"
                    >
                      <TabPanel header="Tag Operations" className="h-full">
                      <div className="p-2 flex w-full h-full">
                        <SimpleGridActions interface={gridInterface2} />
                        <SimpleHtmlGrid
                          id="2"
                          className="simple-html-grid w-full h-full"
                          interface={gridInterface2}
                        />
                        </div>
                      </TabPanel>
                      <TabPanel header="Workpack" className="h-full">
                        
                      </TabPanel>
                      <TabPanel header="Task" className="h-full">
                        <div className="p-1"> panel2</div>
                      </TabPanel>
                      <TabPanel header="Routing" className="h-full">
                        <div className="p-1"> panel2</div>
                      </TabPanel>
                      <TabPanel header="Documents" className="h-full">
                        <div className="p-1"> panel2</div>
                      </TabPanel>
                    </TabView>
                </SplitterPanel>
              </Splitter>
            </TabPanel>
            <TabPanel header="Equipment" className="h-full">
              <div className="p-1"> panel2</div>
            </TabPanel>
          </TabView>
        </div>
        <Menubar model={[]} className="border-0 rounded-none" />
      </PrimeReactProvider>
    </div>
  );
}
