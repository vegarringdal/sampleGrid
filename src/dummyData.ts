export type DummyData = {
  ID: string;
  STATUS: string;
  DISCIPLINE: string;
  TAG_NO: string;
  DESCRIPTION: string;
  DOCID: string;
  LINE_EQUIPMENT: string;
  CREATED: Date;
};

export function getDummyData() {
  const DummyRows: DummyData[] = [];

  /**
   * dummy data
   */
  const DummyRow = {
    ID: "",
    STATUS: "Issued for IDC",
    DISCIPLINE: "PROCESS",
    TAG_NO: "A-20VA001",
    DESCRIPTION: "INLET SEP",
    DOCID: "C232-AI-R-DS-0001",
    LINE_EQUIPMENT: "KJSD",
    CREATED: new Date(),
  };

  for (let i = 0; i < 10; i++) {
    const x = structuredClone(DummyRow);
    x.ID = "SomeUniqueKey" + i;
    DummyRows.push(x);
  }

  return DummyRows;
}
