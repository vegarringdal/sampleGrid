import { TabView, TabPanel } from "primereact/tabview";
import { WorkprepCabelsPanel } from "./WorkprepCabelsPanel";
import { WorkprepEquipmentPanel } from "./WorkprepEquipmentPanel";
import { useParams, useNavigate, generatePath } from "react-router";

export function WorkprepModule() {
  const navigate = useNavigate();
  const { project, tab } = useParams();


  // for setting tab index
  const tabName = tab || "cables";
  const index = tabName === "cables" ? 0 : 1; 

  // poc to see how it looks
  document.title = `PTOC-${project}-${tab}`.toUpperCase()


  return (
    <div className="flex flex-col h-full">
      <TabView
        activeIndex={index}
        pt={{
          panelContainer: {
            className: "h-full",
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
            content: { className: "h-full p-0" },
          }}
        >
          <WorkprepCabelsPanel />
        </TabPanel>
        <TabPanel
          header="Equipment"
          className="h-full"
          pt={{
            headerAction: { className: "p-3" },
            content: { className: "h-full p-0" },
          }}
        >
          <WorkprepEquipmentPanel />
        </TabPanel>
      </TabView>
    </div>
  );
}
