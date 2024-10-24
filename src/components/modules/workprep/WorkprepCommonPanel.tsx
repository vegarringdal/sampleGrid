import { TabView, TabPanel } from "primereact/tabview";
import { SimpleGridActions } from "../../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/SimpleHtmlGrid";
import { gridControllers } from "../../../data/gridController";

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
            dataController={gridControllers.tagOperations}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.tagOperations.getGridInterface()}
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
          <SimpleGridActions dataController={gridControllers.workpack} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.workpack.getGridInterface()}
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
          <SimpleGridActions dataController={gridControllers.task} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.task.getGridInterface()}
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
            dataController={gridControllers.routingAll}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.routingAll.getGridInterface()}
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
            dataController={gridControllers.routingSelected}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.routingSelected.getGridInterface()}
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
            dataController={gridControllers.documentsAll}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.documentsAll.getGridInterface()}
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
            dataController={gridControllers.documentsCable}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.documentsCable.getGridInterface()}
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
            dataController={gridControllers.documentsEquip}
          />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.documentsEquip.getGridInterface()}
          />
        </div>
      </TabPanel>
    </TabView>
  );
}
