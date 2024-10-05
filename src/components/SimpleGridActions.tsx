import { Datasource } from "@simple-html/grid";
import { gridInterface1 } from "../state/gridInterface1";

export function SimpleGridActions(props: { ds: Datasource }) {
  return (
    <div className="flex flex-col pr-2 pt-1 gap-2 h-full">
      <div>
        <button
          className="p-1 h-6 w-6 bg-indigo-700 hover:bg-indigo-600"
          onClick={() => {
            const config = gridInterface1.saveConfig();
            config.readonly = !config.readonly;
            gridInterface1.loadConfig(config);
          }}
        >
          <i className="pi pi-pencil"></i>
        </button>
      </div>

      <button
        className="p-1 h-6 w-6 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
          props.ds.addNewEmpty();
        }}
      >
        <i className="pi pi-plus"></i>
      </button>

      <button
        className="p-1 h-6 w-6 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
          props.ds.resetData();
        }}
      >
        <i className="pi pi-undo"></i>
      </button>

      <button
        className="p-1 h-6 w-6 bg-indigo-700 hover:bg-indigo-600"
        onClick={() => {
          console.log(props.ds.getChanges());
        }}
      >
        <i className="pi pi-print"></i>
      </button>
    </div>
  );
}
