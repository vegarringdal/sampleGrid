export type WorkpackEntity = {
  id: number;
  name: string | null;
  description: string | null;
  printDesciption: string | null;
  status: string | null;

  // agg
  plannedMhr: number | null;
  installedMhr: number | null;

  // holds
  workprepHoldTitle: string | null;
  workprepHoldDecription: string | null;
  formanHoldTitle: string | null;
  formanHoldDesctiption: string | null;

  // audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
