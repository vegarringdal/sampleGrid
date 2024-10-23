export type DummyData = {
  id: string;
  desc: string | null;
  type: string | null;
  dim: string | null;
  comment: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;
};

export function getDummyData() {
  const DummyRows: DummyData[] = [];

  /**
   * dummy data
   */

  DummyRows.push({
    id: "cid" + String(0).padStart(8, "0"),
    desc: "BFOU(i) - 1x2x0.75mm2",
    type: "BFOU(i)",
    dim: "1x2x0.75mm2",
    comment: "",
    createdBy: "OFTYHGE",
    modifiedBy: "OFTYHGE",
    created: new Date(),
    modified: new Date(),
  });

  DummyRows.push({
    id: "cid" + String(1).padStart(8, "0"),
    desc: "BFOU(c) - 2x2x1.50mm2",
    type: "BFOU(c)",
    dim: "2x2x1.50mm2",
    comment: "",
    createdBy: "OFTYHGE",
    modifiedBy: "OFTYHGE",
    created: new Date(),
    modified: new Date(),
  });

  for (let i = 2; i < 40; i++) {
    DummyRows.push({
      id: "cid" + String(i).padStart(8, "0"),
      desc: `BFOU(c) - 2x4x1${String(i).padStart(2, "0")}.mm2`,
      type: "BFOU(c)",
      dim: `2x4x1${String(i).padStart(2, "0")}.mm2`,
      comment: "",
      createdBy: "OFTYHGE",
      modifiedBy: "OFTYHGE",
      created: new Date(),
      modified: new Date(),
    });
  }

  return DummyRows;
}
