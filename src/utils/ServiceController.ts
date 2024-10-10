import { DataController, ControllerEvent } from "./DataController";


/**
 * helper for service
 * no need to edit
 * one service might serve multiple data controllers.
 */ 
export class ServiceController<T> {
  #dataController: DataController<T>[] = [];
  #eventHandler: ServiceEventHandler<T>;

  connectDataSource(dataController: DataController<T>) {
    this.#dataController.push(dataController);
  }

  async callEventHandler(event: ControllerEvent<T>) {
    await this.#eventHandler.handleEvent(this, event);
  }

  constructor(eventHandler: ServiceEventHandler<T>) {
    this.#eventHandler = eventHandler;
  }
}


/////////////////////////////////////////////
// helper classes, dont want 1 file per
//////////////////////////////////////////////


export type ServiceEventHandler<T> = {
    handleEvent: (
      service: ServiceController<T>,
      event: ControllerEvent<T>
    ) => Promise<void>;
  };
  