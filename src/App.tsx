import "./App.css";
import { SetGridTheme } from "./components/SetGridTheme";
import { SimpleHtmlGrid } from "./components/SimpleHtmlGrid";


import { gridInterface } from "./dummyData";



export function App() {
  return (
      <div className="app flex flex-1 p-2 bg-gray-800">
         <SetGridTheme enabled={true}/>
         <SimpleHtmlGrid className="simple-html-grid w-full" interface={gridInterface} />
      </div>
  );
}
