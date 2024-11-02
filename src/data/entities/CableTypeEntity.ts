export type CableTypeEntity = {
  id: number;
  type: string | null;
  discription: string | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
