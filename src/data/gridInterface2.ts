import { Entity, GridInterface } from "@simple-html/grid";
import { DummyData } from "../dummyData";
import { dataSource2 } from "./dataSource2";

/**
 * grid interface1
 */
export const gridInterface2 = new GridInterface<DummyData>(
  {
    columnsCenter: [
      { width: 250, rows: ["ID"] },
      { width: 250, rows: ["STATUS"] },

      { width: 250, rows: ["TAG_NO"] },
      { width: 350, rows: ["DESCRIPTION"] },
      { width: 250, rows: ["DOCID"] }, // for 2 cells stacked    { width: 250, rows: ["DOCID", "DISCIPLINE"] },
      { width: 250, rows: ["LINE_EQUIPMENT"] },
    ],
    attributes: [
      /* will generate default to text type if empty */
      { attribute: "ID", readonly: true },
      { attribute: "DATE", type: "date" },
    ],
  },
  dataSource2
);

gridInterface2.cellAppendClassSetter(
  (attribute: string, rowData: Entity, isReadOnly: boolean) => {
    const c = rowData.__controller;

    if (isReadOnly) {
      return { dimmedClass: "", inputClass: "" };
    }

    if (c && c?.__isNew) {
      return { dimmedClass: "new-cell", inputClass: "" };
    }

    if (c && c.__editedProps && c.__editedProps[attribute]) {
      return { dimmedClass: "edit-cell", inputClass: "" };
    }

    return { dimmedClass: "", inputClass: "" };
  }
);
