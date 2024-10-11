import { Button, ButtonPassThroughOptions } from "primereact/button";
import { DataController } from "../../utils/DataController";

export function SimpleGridActions<T>(props: {
  dataController: DataController<T>;
}) {
  const pt: ButtonPassThroughOptions = {
    root: { className: "p-1" },
    tooltip: {
      root: { className: "text-xs" },
      text: { className: "p-1" },
    },
  };

  return (
    <div className="flex flex-col pr-2 pt-1 gap-2 h-full">
      <Button
        pt={pt}
        tooltip="Load/refresh data"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          props.dataController.requestFetchAll();
        }}
      >
        <i className="pi pi-sync"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Toggle grid edit mode"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          const gridInterface = props.dataController.getGridInterface();
          const config = gridInterface.saveConfig();
          config.readonly = !config.readonly;
          gridInterface.loadConfig(config);
        }}
      >
        <i className="pi pi-pencil"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Add new empty element"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          const gridInterface = props.dataController.getGridInterface();
          const config = gridInterface.saveConfig();
          config.readonly = !config.readonly;
          gridInterface.loadConfig(config);
          gridInterface.getDatasource().addNewEmpty();
        }}
      >
        <i className="pi pi-plus"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Reset all edits"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          const gridInterface = props.dataController.getGridInterface();
          gridInterface.getDatasource().resetData();
        }}
      >
        <i className="pi pi-undo"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Delete selected"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          const datasource = props.dataController
            .getGridInterface()
            .getDatasource();
          const selected = datasource.getSelectedRows();
          if (!selected.length) {
            alert("no rows selected");
          } else {
            datasource.markForDeletion(selected);
          }
        }}
      >
        <i className="pi pi-trash"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Duplicates current"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-copy"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Open import helper, for dumping data from excel"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-file-import"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Saves selected record"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-save"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Generate excel file from current list"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-file-excel"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Prints all edits to console (debug only)"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          console.log(props.dataController.getGridDatasource().getChanges());
          alert("see console log, F12");
        }}
      >
        <i className="pi pi-print"></i>
      </Button>
    </div>
  );
}
