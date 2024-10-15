import { cableDataController } from "./cable/cableDataController";
import { generateDummyController } from "./dummyController";
import { equipmentDataController } from "./equipment/equipmentDataController";

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
