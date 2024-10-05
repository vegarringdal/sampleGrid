import { GridInterface } from "@simple-html/grid";
import { Button } from "primereact/button";

export function SimpleGridActions(props: {
  interface: GridInterface<unknown>;
}) {
  return (
    <div className="flex flex-col pr-2 pt-1 gap-2 h-full">
      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Load/refresh data"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          console.log(props.interface.getDatasource().getChanges());
        }}
      >
        <i className="pi pi-sync"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Toggle grid edit mode"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          const config = props.interface.saveConfig();
          config.readonly = !config.readonly;
          props.interface.loadConfig(config);
        }}
      >
        <i className="pi pi-pencil"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Add new empty element"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          props.interface.getDatasource().addNewEmpty();
        }}
      >
        <i className="pi pi-plus"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Reset all edits"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          props.interface.getDatasource().resetData();
        }}
      >
        <i className="pi pi-undo"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Delete selected"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-trash"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Duplicates current"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-copy"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Open import helper, for dumping data from excel"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-file-import"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Saves selected record"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-save"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Generate excel file from current list"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          alert("Not implemented");
        }}
      >
        <i className="pi pi-file-excel"></i>
      </Button>

      <Button
        pt={{
          tooltip: {
            root: { className: "text-xs" },
            text: { className: "p-1" },
          },
        }}
        tooltip="Prints all edits to console (debug only)"
        tooltipOptions={{ showDelay: 1000 }}
        className="p-1 h-6 w-6 bg-gray-700 hover:bg-gray-600 text-gray-200 border-0"
        onClick={() => {
          console.log(props.interface.getDatasource().getChanges());
        }}
      >
        <i className="pi pi-print"></i>
      </Button>
    </div>
  );
}
