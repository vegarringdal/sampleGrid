import { TabView, TabPanel } from "primereact/tabview";
import { gridInterface2 } from "../../../data/gridInterface2";
import { SimpleGridActions } from "../../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/SimpleHtmlGrid";

export function WorkprepCommonPanel() {
  return (
    <TabView
      className="flex flex-col flex-1 text-xs"
      panelContainerClassName="h-full p-0"
    >
      <TabPanel
        header="Tag Operations"
        className="h-full"
        
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions interface={gridInterface2} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridInterface2}
          />
        </div>
      </TabPanel>
      <TabPanel
        header="Workpack"
        className="h-full"
        
      ></TabPanel>
      <TabPanel
        header="Task"
        className="h-full"
        
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
      <TabPanel
        header="Routing all"
        className="h-full"
        
      ></TabPanel>
      <TabPanel
        header="Routing selected"
        className="h-full"
        
      >
        {" "}
        <div className="p-1"> panel2</div>
      </TabPanel>
      <TabPanel
        header="Documents all"
        className="h-full"
        
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
      <TabPanel
        header="Documents Cable"
        className="h-full"
        
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
      <TabPanel
        header="Documents Equip"
        className="h-full"
        
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
    </TabView>
  );
}
