import {
  TabView,
  TabPanel,
  TabPanelPassThroughOptions,
} from "primereact/tabview";
import { Workpack } from "./commonPanels/Workpack";
import { TagOperations } from "./commonPanels/TagOperations";
import { Task } from "./commonPanels/Task";
import { RoutingAll } from "./commonPanels/RoutingAll";
import { RoutingSelected } from "./commonPanels/RoutingSelected";
import { DocumentAll } from "./commonPanels/DocumentAll";
import { DocumentCable } from "./commonPanels/DocumentCable";
import { DocumentEquipment } from "./commonPanels/DocumentEquipment";
import { CreatetagOperations } from "./commonPanels/CreateTagOperations";
import { OpCodes } from "./commonPanels/OpCodes";
import { CompCodes } from "./commonPanels/CompCodes";
import { Foreman } from "./commonPanels/Foremen";
import { Factor } from "./commonPanels/Factor";

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
      <TabPanel header="Create Tag Op." className="h-full" pt={commonPt}>
        <CreatetagOperations />
      </TabPanel>

      <TabPanel header="Tag Op." className="h-full" pt={commonPt}>
        <TagOperations />
      </TabPanel>

      <TabPanel header="Workpack" className="h-full" pt={commonPt}>
        <Workpack />
      </TabPanel>

      <TabPanel header="Routing" className="h-full" pt={commonPt}>
        <TabView
          className="h-full flex flex-col flex-1 text-xs"
          pt={{ panelContainer: { className: "h-full p-0 w-full" } }}
        >
          {/* dunno if having 2 is useful atm, just an idea */}

          <TabPanel header="Routing all" className="h-full" pt={commonPt}>
            <RoutingAll />
          </TabPanel>

          <TabPanel header="Routing selected" className="h-full" pt={commonPt}>
            <RoutingSelected />
          </TabPanel>
        </TabView>
      </TabPanel>

      <TabPanel header="Docs" className="h-full" pt={commonPt}>
        <TabView
          className="h-full flex flex-col flex-1 text-xs"
          pt={{ panelContainer: { className: "h-full p-0 w-full" } }}
        >
          {/* dunno if having 3 is useful atm, just an idea */}

          <TabPanel
            header="Documents all"
            className="h-full w-full"
            pt={commonPt}
          >
            <DocumentAll />
          </TabPanel>

          <TabPanel header="Documents Cable" className="h-full" pt={commonPt}>
            <DocumentCable />
          </TabPanel>

          <TabPanel header="Documents Equip" className="h-full" pt={commonPt}>
            <DocumentEquipment />
          </TabPanel>
        </TabView>
      </TabPanel>

      <TabPanel header="Misc" className="h-full" pt={commonPt}>
        <TabView
          className="h-full flex flex-col flex-1 text-xs"
          pt={{ panelContainer: { className: "h-full p-0 w-full" } }}
        >
          <TabPanel header="Task" className="h-full" pt={commonPt}>
            <Task />
          </TabPanel>

          <TabPanel header="Op Codes" className="h-full" pt={commonPt}>
            <OpCodes />
          </TabPanel>

          <TabPanel header="Comp Codes" className="h-full" pt={commonPt}>
            <CompCodes />
          </TabPanel>

          <TabPanel header="Factor" className="h-full" pt={commonPt}>
            <Factor />
          </TabPanel>

          <TabPanel header="Foreman" className="h-full" pt={commonPt}>
            <Foreman />
          </TabPanel>
        </TabView>
      </TabPanel>
    </TabView>
  );
}
