import "./App.css";
import { SetGridTheme } from "./components/common/SetGridTheme";
import { Menubar } from "primereact/menubar";
import { Router } from "./components/router";
import { initDarkTheme, toggleDarkTheme } from "./utils/darkThemeHelpers";
import { Button } from "primereact/button";
import { RelatedDataDialog } from "./components/common/ RelatedDataDialog";

initDarkTheme();
////////////////////////////////////////////////////////////////////////
// PS!
// Will be a lot of junk here when Im trying out primereact
////////////////////////////////////////////////////////////////////////

export function App() {
  return (
    <div className="app flex flex-col flex-1 dark:bg-gray-800">
      <RelatedDataDialog/>
      <Menubar
        start={
          <span className="p-2 text-base dark:text-gray-200">
            PTOC - Project Tag Operation Control
          </span>
        }
        end={
          <Button
            pt={{
              root: { className: "p-1" },
              tooltip: {
                root: { className: "text-xs" },
                text: { className: "p-1" },
              },
            }}
            tooltip="toogle mode"
            tooltipOptions={{ showDelay: 1000 }}
            aria-label="toggle theme"
            onClick={() => {
              toggleDarkTheme();
            }}
          >
            <i className="pi pi-sun"></i>
          </Button>
        }
        model={[]}
        pt={{ root: { className: "rounded-none border-0" } }}
      />
      <SetGridTheme />
      <Router />
      <Menubar
        model={[]}
        pt={{ root: { className: "rounded-none border-0" } }}
      />
    </div>
  );
}
