import { Button, ButtonPassThroughOptions } from "primereact/button";
import { GridController } from "../../data/utils/GridController";

export function SimpleGridActions<T>(props: {
  dataController: GridController<T>;
}) {
  const cs = props.dataController.storeHook();

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
        disabled={cs.isEditmode}
        tooltip="Load/refresh data"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          props.dataController.requestFetchAll();
        }}
        aria-label="refresh"
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
          props.dataController
            .getStore()
            .setState({ isEditmode: !cs.isEditmode });
        }}
        aria-label="edit"
      >
        <i className="pi pi-pencil"></i>
      </Button>

      <br className="p-2"></br>

      <Button
        pt={pt}
        disabled={!cs.isEditmode}
        tooltip="Add new empty element"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          const gridInterface = props.dataController.getGridInterface();
          const config = gridInterface.saveConfig();
          if (config.readonly) {
            config.readonly = !config.readonly;
            gridInterface.loadConfig(config);
          }

          gridInterface.getDatasource().addNewEmpty();
        }}
        aria-label="new"
      >
        <i className="pi pi-plus"></i>
      </Button>

      <Button
        pt={pt}
        disabled={!cs.isEditmode}
        tooltip="Reset all edits"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          const gridInterface = props.dataController.getGridInterface();
          gridInterface.getDatasource().resetData();
        }}
        aria-label="reset"
      >
        <i className="pi pi-undo"></i>
      </Button>

      <Button
        pt={pt}
        disabled={!cs.isEditmode}
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
        aria-label="deleted selected"
      >
        <i className="pi pi-trash"></i>
      </Button>

      <Button
        pt={pt}
        disabled={!cs.isEditmode}
        tooltip="Duplicates current"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
        aria-label="duplicate row"
      >
        <i className="pi pi-copy"></i>
      </Button>

      <br className="p-2"></br>

      <Button
        pt={pt}
        disabled={!cs.isEditmode}
        tooltip="Saves selected record"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
        aria-label="save selected"
      >
        <i className="pi pi-save"></i>
      </Button>

      <br className="p-2"></br>

      <Button
        pt={pt}
        disabled={cs.isEditmode}
        tooltip="Open import helper, for dumping data from excel"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
        aria-label="open import helper"
      >
        <i className="pi pi-file-import"></i>
      </Button>

      <Button
        pt={pt}
        disabled={cs.isEditmode}
        tooltip="Generate excel file from current list"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          alert("Not implemented");
        }}
        aria-label="generate excel"
      >
        <i className="pi pi-file-excel"></i>
      </Button>

      <Button
        pt={pt}
        disabled={cs.isEditmode}
        tooltip="Prints all edits to console (debug only)"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          console.log(props.dataController.getGridDatasource().getChanges());
          alert("see console log, F12");
        }}
        aria-label="debug/print changes"
      >
        <i className="pi pi-print"></i>
      </Button>
    </div>
  );
}
