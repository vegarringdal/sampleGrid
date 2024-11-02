export type CableTypeNoEntity = {
  id: number;
  ctypno: string | null;
  discription: string | null;

  //related
  typeId: number | null;
  type: string | null;

  //related
  dimId: number | null;
  dim: number | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
