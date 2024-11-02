export type DocumentEntity = {
  id: number;
  tag: string | null;
  documentId: string | null;
  documentDesc: string | null;
  documentRev: string | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
