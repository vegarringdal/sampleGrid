import { GridInterface } from "@simple-html/grid";

export function SimpleGridActions(props: { interface: GridInterface<unknown> }) {
  return (
    <div className="flex flex-col pr-2 pt-1 gap-2 h-full">
      <div>
        <button
          className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600"
          onClick={() => {
            const config = props.interface.saveConfig();
            config.readonly = !config.readonly;
            props.interface.loadConfig(config);
          }}
        >
          <i className="pi pi-pencil"></i>
        </button>
      </div>

      <button
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600"
        onClick={() => {
          props.interface.getDatasource().addNewEmpty();
        }}
      >
        <i className="pi pi-plus"></i>
      </button>

      <button
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600"
        onClick={() => {
          props.interface.getDatasource().resetData();
        }}
      >
        <i className="pi pi-undo"></i>
      </button>

      <button
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600"
        onClick={() => {
          console.log(props.interface.getDatasource().getChanges());
        }}
      >
        <i className="pi pi-print"></i>
      </button>
    </div>
  );
}
