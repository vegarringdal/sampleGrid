import { TabView, TabPanel } from "primereact/tabview";
import { generatePath, useNavigate, useParams } from "react-router";
import { gridControllers } from "../../../data/gridControllers";
import { SimpleGridActions } from "../../common/grid/SimpleGridActions";
import { SimpleHtmlGrid } from "../../common/grid/SimpleHtmlGrid";

export function WorkprepCableEquipment() {
  const navigate = useNavigate();
  const { project, tab } = useParams();

  // for setting tab index
  const tabName = tab || "cables";
  const index = tabName === "cables" ? 0 : 1;

  return (
    <TabView
      activeIndex={index}
      pt={{
        panelContainer: {
          className: "h-full flex",
        },
      }}
      className="flex flex-col flex-1 text-xs"
      onTabChange={(e) => {
        // so url stays correct
        const path = generatePath("/workprep/:project/:tab", {
          project: project as string,
          tab: e.index === 0 ? "cables" : "equipment",
        });
        navigate(path);
      }}
    >
      <TabPanel
        header="Cables"
        className="h-full flex"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-2 flex w-full" },
        }}
      >
        <SimpleGridActions gridController={gridControllers.cable} />

        <SimpleHtmlGrid
          id="1"
          className="simple-html-grid w-full h-full"
          interface={gridControllers.cable.getGridInterface()}
        />
      </TabPanel>

      <TabPanel
        header="Equipment"
        className="h-full flex"
        pt={{
          headerAction: { className: "p-3" },
          content: { className: "h-full p-2 flex w-full" },
        }}
      >
        <SimpleGridActions gridController={gridControllers.equipment} />

        <SimpleHtmlGrid
          id="1"
          className="simple-html-grid w-full h-full"
          interface={gridControllers.equipment.getGridInterface()}
        />
      </TabPanel>
    </TabView>
  );
}
