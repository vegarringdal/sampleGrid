export type TaskEntity = {
  id: number;
  name: string | null;
  description: string | null;

  activity: string | null;
  earlyStart: Date | null;
  earlyFinish: Date | null;

  // agg
  plannedMhr: number | null;
  installedMhr: number | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
