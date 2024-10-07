import "./App.css";
import { SetGridTheme } from "./components/common/SetGridTheme";
import { Menubar } from "primereact/menubar";
import { Router } from "./components/router";

////////////////////////////////////////////////////////////////////////
// PS!
// Will be a lot of junk here when Im trying out primereact
////////////////////////////////////////////////////////////////////////

export function App() {
  return (
    <div className="app flex flex-col flex-1 dark:bg-gray-800">
      <Menubar model={[]} className="border-0 rounded-none" />
      <SetGridTheme enabled={true} />
      <Router />
      <Menubar model={[]} className="border-0 rounded-none" />
    </div>
  );
}
