import { GridController, ControllerEvent } from "./GridController";

/**
 * helper for service
 * no need for editing
 * one service might serve multiple grid controllers.
 */
export class ServiceController<T> {
  #dataController: GridController<T>[] = [];
  #eventHandler: ServiceEventHandler<T>;

  connectDataSource(dataController: GridController<T>) {
    this.#dataController.push(dataController);
  }

  async callEventHandler(event: ControllerEvent<T>) {
    await this.#eventHandler.handleEvent(this, event);
  }

  getDataControllers() {
    return this.#dataController;
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
