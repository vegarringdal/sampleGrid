export type TaskEntity = {
  id: number;
  name: string | null;
  description: string | null;

  activityID: number | null;
  activity: string | null;
  earlyStart: Date | null;
  earlyFinish: Date | null;

  state: string | null;
  progressmethod: string | null;
  buildingBlock: string | null;
  site: string | null;

  //related
  mcId: number;
  mc: string;
  com: string;

  // agg
  plannedMhr: number | null;
  earnedMhr: number | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
