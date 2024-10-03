import { Datasource, GridInterface } from "@simple-html/grid";

/**
 * dummy data
 */
const DummyRow = {
  ID: 0,
  STATUS: "Issued for IDC",
  DISCIPLINE: "PROCESS",
  TAG_NO: "A-20VA001",
  DESCRIPTION: "INLET SEP",
  DOCID: "C232-AI-R-DS-0001",
  LINE_EQUIPMENT: "KJSD",
};

const DummyRows = [];

for (let i = 1; i < 1000; i++) {
  const x = structuredClone(DummyRow);
  x.ID = i;
  DummyRows.push(x);
}


/**
 * datasource
 */
export const dataSource = new Datasource();
dataSource.setData(DummyRows);

/**
 * grid interface
 */
export const gridInterface = new GridInterface(
  {
    columnsCenter: [
      { width: 250, rows: ["STATUS"] },
      { width: 150, rows: ["DISCIPLINE"] },
      { width: 250, rows: ["TAG_NO"] },
      { width: 350, rows: ["DESCRIPTION"] },
      { width: 250, rows: ["DOCID"] },
      { width: 250, rows: ["LINE_EQUIPMENT"] },
    ],
    attributes: [
      /* will generate default to text type if empty */
    ],
  },
  dataSource
);
