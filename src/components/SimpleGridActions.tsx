import { Datasource } from "@simple-html/grid";
import { gridInterface1 } from "../state/gridInterface1";

export function SimpleGridActions(props: { ds: Datasource }) {
  return (
    <div className="flex flex-col p-2 w-32 gap-2">


<button
        className="p-2 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
            const config = gridInterface1.saveConfig();
            config.readonly = !config.readonly;
            gridInterface1.loadConfig(config);
        }}
      >
        toggle edit 
      </button>


      <button
        className="p-2 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
          props.ds.addNewEmpty();
        }}
      >
        new entity
      </button>


      <button
        className="p-2 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
          props.ds.resetData();
        }}
      >
        reset all
      </button>


      <button
        className="p-2 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
          console.log(props.ds.getChanges());
        }}
      >
        print changes
      </button>
    </div>
  );
}
