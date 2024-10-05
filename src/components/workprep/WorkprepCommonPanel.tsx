import { TabView, TabPanel } from "primereact/tabview";
import { gridInterface2 } from "../../state/gridInterface2";
import { SimpleGridActions } from "../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../common/SimpleHtmlGrid";

export function WorkprepCommonPanel() {
  return (
    <TabView
      className="flex flex-col flex-1 text-xs"
      panelContainerClassName="h-full p-0"
    >
      <TabPanel
        header="Tag Operations"
        className="h-full"
        pt={{ headerAction: { className: "p-3" } }}
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
        pt={{ headerAction: { className: "p-3" } }}
      ></TabPanel>
      <TabPanel
        header="Task"
        className="h-full"
        pt={{ headerAction: { className: "p-3" } }}
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
      <TabPanel
        header="Routing"
        className="h-full"
        pt={{ headerAction: { className: "p-3" } }}
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
      <TabPanel
        header="Documents"
        className="h-full"
        pt={{ headerAction: { className: "p-3" } }}
      >
        <div className="p-1"> panel2</div>
      </TabPanel>
    </TabView>
  );
}
