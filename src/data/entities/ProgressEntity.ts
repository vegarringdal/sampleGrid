export type ProgressEntity = {
  id: number;

  opcode: string | null;
  tag: string | null;
  drum: string | null;
  installedQty: number | null;
  installedDate: Date | null;
  foreman: string | null;

  meterHigh: number | null;
  meterLow: number | null;
  termMetermarking: string | null;
  termLength: number | null;
  termTorqueNm: number | null;

  testContinuityOhm: number | null;
  testInsulationMohm: number | null;
  testInsulationDeviceId: string | null;
  testInsulationVoltage: number | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
