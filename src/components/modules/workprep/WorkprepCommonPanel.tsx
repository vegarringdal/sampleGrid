import { TabView, TabPanel, TabPanelPassThroughOptions } from "primereact/tabview";
import { Workpack } from "./commonPanels/workpack";
import { TagOperations } from "./commonPanels/tagOperations";
import { Task } from "./commonPanels/task";
import { RoutingAll } from "./commonPanels/routingAll";
import { RoutingSelected } from "./commonPanels/routingSelected";
import { DocumentAll } from "./commonPanels/documentAll";
import { DocumentCable } from "./commonPanels/documentCable";
import { DocumentEquipment } from "./commonPanels/documentEquipment";

export function WorkprepCommonPanel() {
  const commonPt: TabPanelPassThroughOptions = {
    headerAction: { className: "p-3" },
    content: { className: "h-full p-0" },
  };

  return (
    <TabView
      className="flex flex-col flex-1 text-xs"
      pt={{ panelContainer: { className: "h-full p-0 w-full" } }}
    >
      <TabPanel header="Tag Operations" className="h-full" pt={commonPt}>
        <TagOperations />
      </TabPanel>

      <TabPanel header="Workpack" className="h-full" pt={commonPt}>
        <Workpack />
      </TabPanel>

      <TabPanel header="Task" className="h-full" pt={commonPt}>
        <Task />
      </TabPanel>

      <TabPanel header="Routing all" className="h-full" pt={commonPt}>
        <RoutingAll />
      </TabPanel>

      <TabPanel header="Routing selected" className="h-full" pt={commonPt}>
        <RoutingSelected />
      </TabPanel>

      <TabPanel header="Documents all" className="h-full" pt={commonPt}>
        <DocumentAll />
      </TabPanel>

      <TabPanel header="Documents Cable" className="h-full" pt={commonPt}>
        <DocumentCable />
      </TabPanel>

      <TabPanel header="Documents Equip" className="h-full" pt={commonPt}>
        <DocumentEquipment />
      </TabPanel>
    </TabView>
  );
}
