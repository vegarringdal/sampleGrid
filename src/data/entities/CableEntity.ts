export type CableEntity = {
  id: number;
  tag: string | null;
  fromTag: string | null;
  areaFrom: string | null;
  toTag: string | null;
  areaTo: string | null;
  site: string | null;
  const: string | null;
  design: string | null;
  cableId: string | null;
  cableDesc: string | null;
  cableType: string | null;
  cableTypeDim: string | null;
  dicipline: string | null;
  source: string | null;
  status: string | null;

  partAddressFrom: string | null;
  partAddressTo: string | null;
  termFrom: string | null;
  termTo: string | null;

  fromTagDescription: string | null;
  toTagDescription: string | null;
  allocatedDrum: string | null;
  estimatedLength: number | null;
  preEstimatedLength: number | null;
  pulledLength: number | null;
  fromTareLength: number | null;
  toTareLength: number | null;
  fromNode: string | null;
  toNode: string | null;
  coilFromNode: string | null;
  coilToNode: string | null;
  fromGlandType: string | null;
  toGlandType: string | null;

  mc: string | null;
  com: string | null;
  op01: string | null;
  op02: string | null;
  op03: string | null;
  op04: string | null;
  op05: string | null;
  op06: string | null;
  op07: string | null;
  op08: string | null;
  op09: string | null;
  op10: string | null;
  op11: string | null;
  op12: string | null;
  op13: string | null;
  op14: string | null;
  op15: string | null;
  op16: string | null;
  extString01: string | null;
  extString02: string | null;
  extString03: string | null;
  extString04: string | null;
  extString05: string | null;
  extString06: string | null;
  extString07: string | null;
  extString08: string | null;
  extString09: string | null;
  extString10: string | null;
  comment: string | null;

  // audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
