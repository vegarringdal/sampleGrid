import { DummyData } from "../dummyData";
import { DataController } from "../utils/DataController";
import { cableDataController } from "./cable/cableDataController";
import { CableEntity } from "./cable/cableEntity";
import { generateDummyController } from "./dummyController";
import { equipmentDataController } from "./equipment/equipmentDataController";
import { equipmentEntity } from "./equipment/equipmentEntity";

// for now we generate some dummy datasources, can only have one datasource and gridInterface connected
// service controller can be updated to many, and update many
// added many so we can play around with loading dialogs etc/gui

export const sources = {
  cable: cableDataController,
  equipment: equipmentDataController,

  workpack: generateDummyController(),
  workpackDialog: generateDummyController(),

  task: generateDummyController(),
  taskDialog: generateDummyController(),

  opCodes: generateDummyController(),
  opCodesDialog: generateDummyController(),

  compcodes: generateDummyController(),
  compcodesDialog: generateDummyController(),

  tagOperations: generateDummyController(),
  tagOperationsSelectedWorkpack: generateDummyController(),
  tagOperationsSelectedTask: generateDummyController(),

  routingAll: generateDummyController(),
  routingSelected: generateDummyController(),

  documentsAll: generateDummyController(),
  documentsEquip: generateDummyController(),
  documentsCable: generateDummyController(),

  foreman: generateDummyController(),
  foremanDialog: generateDummyController(), //dialog workpack

  progress: generateDummyController(),

  drum: generateDummyController(),
  cabletype: generateDummyController(),
  cableDim: generateDummyController(),
  cableSort: generateDummyController(),

  template: generateDummyController(),
  templateLines: generateDummyController(),

  // dialogs task
  mcDialog: generateDummyController(),
  comDialog: generateDummyController(),
  activityDialog: generateDummyController(),
  areaDialog: generateDummyController(),

  // all projects user have access to
  userProjects: generateDummyController(),
  // all roles user have for each project, each project a user can have different role
  userProjectRoles: generateDummyController(),
};

// need type declaration, since we want to ref to sources in datacontroller config
// we cant have direct ref, since we also create it here

export type sourceNames = {
  cable: DataController<CableEntity>;
  equipment: DataController<equipmentEntity>;

  workpack: DataController<DummyData>;
  workpackDialog: DataController<DummyData>;

  task: DataController<DummyData>;
  taskDialog: DataController<DummyData>;

  opCodes: DataController<DummyData>;
  opCodesDialog: DataController<DummyData>;

  compcodes: DataController<DummyData>;
  compcodesDialog: DataController<DummyData>;

  tagOperations: DataController<DummyData>;
  tagOperationsSelectedWorkpack: DataController<DummyData>;
  tagOperationsSelectedTask: DataController<DummyData>;

  routingAll: DataController<DummyData>;
  routingSelected: DataController<DummyData>;

  documentsAll: DataController<DummyData>;
  documentsEquip: DataController<DummyData>;
  documentsCable: DataController<DummyData>;

  foreman: DataController<DummyData>;
  foremanDialog: DataController<DummyData>; //dialog workpack

  progress: DataController<DummyData>;

  drum: DataController<DummyData>;
  cabletype: DataController<DummyData>;
  cableDim: DataController<DummyData>;
  cableSort: DataController<DummyData>;

  template: DataController<DummyData>;
  templateLines: DataController<DummyData>;

  // dialogs task
  mcDialog: DataController<DummyData>;
  comDialog: DataController<DummyData>;
  activityDialog: DataController<DummyData>;
  areaDialog: DataController<DummyData>;

  // all projects user have access to
  userProjects: DataController<DummyData>;
  // all roles user have for each project, each project a user can have different role
  userProjectRoles: DataController<DummyData>;
};
