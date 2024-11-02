export type DrumEntity = {
  id: number;
  drum: string | null;

  ctypenoId: number | null;
  ctypeno: string | null;
  dim: string | null;
  type: string | null;

  poNo: string | null;
  poItemNo: string | null;
  projectMaterialId: string | null;
  vendorMaterialId: string | null;
  companyNo: string | null;
  materialDesc: string | null;
  deliverylength: number | null;
  deliveryDate: Date | null;
  lost: number | null;
  remaining: number | null;
  lengthRetured: number | null;
  scrapped: number | null;
  sentOffsite: number | null;
  pulled: number | null;
  comment: string | null;
  meterMarking: boolean | null;
  predef: string | null;
  dateReturned: Date | null;
  location: string | null;
  requestedBy: string | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
