export type EquipmentEntity = {
  // todo: add fields we really need, just dummy datasource atm
  id: number;
  tag: string | null;
  serviceDescription1: string | null;
  serviceDescription2: string | null;

  site: string | null;
  const: string | null;
  design: string | null;
  area: string | null;

  dicipline: string | null;
  source: string | null;
  designCode: string | null;
  areaCode: string | null;
  systemCode: string | null;

  eqCode: string | null;
  parentTag: string | null;
  dummyRef: string | null;
  reportGroup: string | null;
  package: string | null;
  fireArea: string | null;
  weigthDry: string | null;
  globX: number | null;
  globY: number | null;
  globZ: number | null;

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

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
