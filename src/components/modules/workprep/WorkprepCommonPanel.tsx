import { TabView, TabPanel } from "primereact/tabview";
import { SimpleGridActions } from "../../common/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/SimpleHtmlGrid";
import { gridControllers } from "../../../data/gridControllers";

export function WorkprepCommonPanel() {
  return (
    <TabView
      className="flex flex-col flex-1 text-xs"
      pt={{ panelContainer: { className: "h-full p-0" } }}
    >

    {/* ======= WORKPACK ========*/}

      <TabPanel
        header="Tag Operations"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.tagOperations} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.tagOperations.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= WORKPACK ========*/}

      <TabPanel
        header="Workpack"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.workpack} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.workpack.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= TASK ========*/}

      <TabPanel
        header="Task"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.task} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.task.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= ROUTING ALL ========*/}

      <TabPanel
        header="Routing all"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.routingAll} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.routingAll.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= ROUTING SELECTED ========*/}

      <TabPanel
        header="Routing selected"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.routingSelected} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.routingSelected.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= DOCUMENTS ALL ========*/}

      <TabPanel
        header="Documents all"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.documentsAll} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.documentsAll.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= DOCUMENTS CABLE ========*/}

      <TabPanel
        header="Documents Cable"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.documentsCable} />
          <SimpleHtmlGrid
            id="2"
            className="simple-html-grid w-full h-full"
            interface={gridControllers.documentsCable.getGridInterface()}
          />
        </div>
      </TabPanel>

      {/* ======= DOCUMENTS EQUIPMENT ========*/}

      <TabPanel
        header="Documents Equip"
        className="h-full"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-0" },
        }}
      >
        <div className="p-2 flex w-full h-full">
          <SimpleGridActions gridController={gridControllers.documentsEquip} />
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
