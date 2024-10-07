import { DataContainer, Datasource, GridConfig, GridInterface } from "@simple-html/grid"
import { DummyRows } from "../dummyData"

import { create, StoreApi, UseBoundStore } from 'zustand'


// not sure if I want to have 1 data container shared or service to update 2 datasources ?
// need to test it out a little before I know for sure.

export const dataContainer = new DataContainer()
dataContainer.setData(DummyRows, true)



// playing around with ideas here..
// todo move into utils later

type DataControllerState = {
    isLoading: boolean;
    isEditmode: boolean;
}

export class DataController<T>{
    configuration: unknown
    datasource: Datasource<T>
    gridconfig: GridInterface<T>
    stateStore: UseBoundStore<StoreApi<DataControllerState>>


    constructor(configuration: unknown, dataContainer: DataContainer){

        //todo, define how later
        // this will also be used to create datasource etc
        this.configuration = configuration;
        const x = {} as GridConfig;


        this.datasource = new Datasource<T>(dataContainer);
        this.gridconfig = new GridInterface<T>(x, this.datasource);
        this.stateStore = create<DataControllerState>(()=>({
            isLoading: false,
            isEditmode: false
        }));

    }
}


export class DataService<T> {
    

    transformResult(row: T){

    }

    getAll(project: string) {

        return [] as T[]
    }

    // new
    post(project: string, data: T){

        return {} as T
    }

    // delete
    delete(project: string, id: string){

    }
    
    // update
    patch(project: string, data:T){

    }

}




// so do I define a service and get this to return dataContainer, maybe a event for updates ?

/* export const dataControllers = {
    cables: new DataController({}, new DataContainer()),
    equipment: new DataController({}, new DataContainer()),
    tagOperations: new DataController({}, new DataContainer()),
    task: new DataController({}, new DataContainer()),
    taskDialog: new DataController({}, new DataContainer()), // this needs same dataContainer as task
    opCodes: new DataController({}, new DataContainer()),
} */