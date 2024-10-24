import { DummyData } from "../../utils/mockdata/dummyData";
import { GridController } from "../utils/GridController";
import { cableDataController } from "./cableGridController";
import { CableEntity } from "../entities/cableEntity";
import { generateDummyController } from "../utils/dummyController";
import { equipmentDataController } from "./equipmentGridController";
import { equipmentEntity } from "../entities/equipmentEntity";

// for now we generate some dummy datasources, can only have one datasource and gridInterface connected
// service controller can be updated to many, and update many
// added many so we can play around with loading dialogs etc/gui

export const gridControllers: GridControllerTypes = {
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
  foremanDialog: generateDummyController(),

  progress: generateDummyController(),

  drum: generateDummyController(),
  drumSelectCableSort: generateDummyController(),

  cableSort: generateDummyController(),
  cableSortDialog: generateDummyController(),

  cabletypeDim: generateDummyController(),
  cabletypeDimDialog: generateDummyController(),
  cabletypeType: generateDummyController(),
  cabletypeTypeDialog: generateDummyController(),

  template: generateDummyController(),
  templateLines: generateDummyController(),

  mcDialog: generateDummyController(),
  comDialog: generateDummyController(),
  activityDialog: generateDummyController(),
  areaDialog: generateDummyController(),

  userProjects: generateDummyController(),
  userProjectRoles: generateDummyController(),
};

// need type declaration, since we want to ref to sources in datacontroller config
// we cant have direct ref, since we also create it here

export type GridControllerTypes = {
  cable: GridController<CableEntity>;
  equipment: GridController<equipmentEntity>;

  workpack: GridController<DummyData>;
  workpackDialog: GridController<DummyData>; // for selecting under tagoperation

  task: GridController<DummyData>;
  taskDialog: GridController<DummyData>;

  opCodes: GridController<DummyData>;
  opCodesDialog: GridController<DummyData>;

  compcodes: GridController<DummyData>;
  compcodesDialog: GridController<DummyData>;

  tagOperations: GridController<DummyData>;
  tagOperationsSelectedWorkpack: GridController<DummyData>;
  tagOperationsSelectedTask: GridController<DummyData>;

  routingAll: GridController<DummyData>;
  routingSelected: GridController<DummyData>;

  documentsAll: GridController<DummyData>;
  documentsEquip: GridController<DummyData>;
  documentsCable: GridController<DummyData>;

  foreman: GridController<DummyData>;
  foremanDialog: GridController<DummyData>; // for selecting under workpack

  progress: GridController<DummyData>;

  drum: GridController<DummyData>;
  drumSelectCableSort: GridController<DummyData>;

  cableSort: GridController<DummyData>;
  cableSortDialog: GridController<DummyData>; // for selecting under cables & drum

  cabletypeDim: GridController<DummyData>;
  cabletypeDimDialog: GridController<DummyData>; // for selecting under cableSort
  cabletypeType: GridController<DummyData>;
  cabletypeTypeDialog: GridController<DummyData>; // for selecting under cableSort

  template: GridController<DummyData>;
  templateLines: GridController<DummyData>;

  // dialogs task
  mcDialog: GridController<DummyData>;
  comDialog: GridController<DummyData>;
  activityDialog: GridController<DummyData>;
  areaDialog: GridController<DummyData>;

  // all projects user have access to
  userProjects: GridController<DummyData>;
  // all roles user have for each project, each project a user can have different role
  userProjectRoles: GridController<DummyData>;
};
