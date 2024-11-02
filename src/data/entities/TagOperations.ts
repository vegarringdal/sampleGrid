export type TagOperationEntity = {
  id: number;
  tag: string | null;

  desc: string | null; //for cable it would be cable, for equipment its

  //related
  workpackId: number | null;
  workpack: string | null;
  foreman: string | null; // from workpack

  //related
  taskId: number | null;
  task: string | null;

  //related
  opCodeId: number | null;
  opCode: string | null;
  opCodeDesc: string | null;

  // manuel, just order of opcode
  opNo: number | null;

  //related
  compCodeId: number | null;
  compCode: string | null;

  //related
  factorId: number | null;
  factor: string | null;

  //agg
  plannedQty: number | null;
  installedQty: number | null;

  // agg
  plannedMhr: number | null;
  installMhr: number | null;

  // hold/comments
  isHold: boolean | null;
  holdComment: string | null;
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
