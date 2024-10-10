import { TabView, TabPanel } from "primereact/tabview";
import { SimpleGridActions } from "../../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/SimpleHtmlGrid";
import { sources } from "../../../data/sources";

export function WorkprepCommonPanel() {
  return (
    <TabView
      className="flex flex-col flex-1 text-xs"
      pt={{ panelContainer: { className: "h-full p-0" } }}
    >
      <TabPanel
        header="Tag Operations"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions
            interface={sources.tagOperations.getGridInterface()}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.tagOperations.getGridInterface()}
          />
        </div>
      </TabPanel>

      <TabPanel
        header="Workpack"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions interface={sources.workpack.getGridInterface()} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.workpack.getGridInterface()}
          />
        </div>
      </TabPanel>

      <TabPanel
        header="Task"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions interface={sources.task.getGridInterface()} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.task.getGridInterface()}
          />
        </div>
      </TabPanel>

      <TabPanel
        header="Routing all"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions
            interface={sources.routingAll.getGridInterface()}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.routingAll.getGridInterface()}
          />
        </div>
      </TabPanel>
      <TabPanel
        header="Routing selected"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions
            interface={sources.routingSelected.getGridInterface()}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.routingSelected.getGridInterface()}
          />
        </div>
      </TabPanel>
      <TabPanel
        header="Documents all"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions
            interface={sources.documentsAll.getGridInterface()}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.documentsAll.getGridInterface()}
          />
        </div>
      </TabPanel>
      <TabPanel
        header="Documents Cable"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions
            interface={sources.documentsCable.getGridInterface()}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.documentsCable.getGridInterface()}
          />
        </div>
      </TabPanel>
      <TabPanel
        header="Documents Equip"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions
            interface={sources.documentsEquip.getGridInterface()}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={sources.documentsEquip.getGridInterface()}
          />
        </div>
      </TabPanel>
    </TabView>
  );
}
