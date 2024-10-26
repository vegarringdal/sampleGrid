import { Button, ButtonPassThroughOptions } from "primereact/button";
import { GridController } from "../../../data/common/GridController";
import { readAndCompareData } from "../../../utils/excel/readAndCompareData";

export function SimpleGridActions<T, U>(props: {
  gridController: GridController<T, U>;
}) {
  const cs = props.gridController.storeHook();

  const pt: ButtonPassThroughOptions = {
    root: { className: "p-1 min-h-6" },
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
          props.gridController.requestFetchAll();
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
          const gridInterface = props.gridController.getGridInterface();
          const config = gridInterface.saveConfig();
          config.readonly = !config.readonly;
          gridInterface.loadConfig(config);
          props.gridController
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
          const gridInterface = props.gridController.getGridInterface();
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
          const gridInterface = props.gridController.getGridInterface();
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
          const datasource = props.gridController
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
          props.gridController.copyRow();
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
          console.log(props.gridController.getGridDatasource().getChanges());
          alert("not implemented, see console log for changes, F12");
        }}
        aria-label="save selected"
      >
        <i className="pi pi-save"></i>
      </Button>

      <br className="p-2"></br>

      <Button
        pt={pt}
        disabled={!cs.isEditmode}
        tooltip="Open import helper, for dumping data from excel"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={() => {
          readAndCompareData(props.gridController);
        }}
        aria-label="open import helper"
      >
        <i className="pi pi-file-import"></i>
      </Button>

      <Button
        pt={pt}
        tooltip="Generate excel file from current list"
        tooltipOptions={{ showDelay: 1000 }}
        onClick={async () => {
          await props.gridController.createExcel();
        }}
        aria-label="generate excel"
      >
        <i className="pi pi-file-excel"></i>
      </Button>
    </div>
  );
}
