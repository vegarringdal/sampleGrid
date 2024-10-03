import "./App.css";
import { SetGridTheme } from "./components/SetGridTheme";
import { SimpleGridActions } from "./components/SimpleGridActions";
import { SimpleHtmlGrid } from "./components/SimpleHtmlGrid";
import { dataSource1 } from "./state/dataSource1";
import { gridInterface1 } from "./state/gridInterface1";

export function App() {
  return (
    <div className="app flex flex-1 p-2 bg-gray-800 text-gray-200">
      
      <SetGridTheme enabled={true} />
      <div className="flex w-full">
        <SimpleGridActions ds={dataSource1}/>
        <SimpleHtmlGrid
          className="simple-html-grid w-full"
          interface={gridInterface1}
        />
      </div>
     
    </div>
  );
}
