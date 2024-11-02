export type TemplateLineEntity = {
  id: number; //readonly
  templateID: number; //parent ref

  opNo: number | null;
  op: string | null;
  compcode: string | null;
  compDesc: string | null;
  factor: string | null;

  task: string | null; //not really something we save, service controller shoudl remove or part of grid config ?
  workpack: string | null; //see above
  quantity: string | null; //se above

  // audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
