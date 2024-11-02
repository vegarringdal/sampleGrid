export type RoutingEntity = {
  id: number;
  tag: string | null;
  seq: number | null; //order
  segment: string | null;
  nodeFrom: string | null;
  nodeTo: string | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
