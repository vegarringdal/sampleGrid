export type DummyData = {
  ID: string;
  STATUS: string;
  DISCIPLINE: string;
  TAG_NO: string;
  DESCRIPTION: string;
  DOCID: string;
  LINE_EQUIPMENT: string;
  DATE: Date;
};

export const DummyRows: DummyData[] = [];

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
  DATE: new Date(),
};

for (let i = 105; i < 100000; i++) {
  const x = structuredClone(DummyRow);
  x.ID = "SomeUniqueKey"  + i;
  DummyRows.push(x);
}
