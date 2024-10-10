import { cableDataController } from "./cable/cableDataController";

// for now I just use one dataController while testing

export const sources = {
    cable: cableDataController,
    equipment: cableDataController,
    
    workpack: cableDataController,
    workpackDialog: cableDataController,
    
    task: cableDataController,
    taskDialog: cableDataController,

    opCodes: cableDataController,
    opCodesDialog: cableDataController,
    
    compcodes: cableDataController,
    compcodesDialog: cableDataController,

    tagOperations: cableDataController,
    tagOperationsWorkpack: cableDataController,
    tagOperationsTask: cableDataController,

    
    // workprep module
    routingAll: cableDataController,
    routingSelected: cableDataController,

    // workprep module
    documentsAll: cableDataController,
    documentsEquip: cableDataController,
    documentsCable: cableDataController,
}