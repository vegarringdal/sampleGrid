import "./App.css";
import { SetGridTheme } from "./components/common/SetGridTheme";
import { Menubar } from "primereact/menubar";
import { Router } from "./components/router";
import { initDarkTheme } from "./utils/darkThemeHelpers";

initDarkTheme();
////////////////////////////////////////////////////////////////////////
// PS!
// Will be a lot of junk here when Im trying out primereact
////////////////////////////////////////////////////////////////////////

export function App() {
  return (
    <div className="app flex flex-col flex-1 dark:bg-gray-800">
      <Menubar
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
