import "./App.css";
import { SetGridTheme } from "./components/common/SetGridTheme";
import { PrimeReactProvider } from "primereact/api";
import { Menubar } from "primereact/menubar";
import { WorkprepModule } from "./components/workprep/WorkprepModule";

////////////////////////////////////////////////////////////////////////
// PS!
// Will be a lot of junk here when Im trying out primereact
////////////////////////////////////////////////////////////////////////

export function App() {
  return (
    <div className="app flex flex-col flex-1  bg-gray-800">
      <PrimeReactProvider>
        <Menubar model={[]} className="border-0 rounded-none" />
        <SetGridTheme enabled={true} />
        <div className="w-full flex flex-1">
          <WorkprepModule />
        </div>
        <Menubar model={[]} className="border-0 rounded-none" />
      </PrimeReactProvider>
    </div>
  );
}


