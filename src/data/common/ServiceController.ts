import { GridController, ControllerEvent } from "./GridController";

/**
 * helper for service
 * no need for editing
 * one service might serve multiple grid controllers.
 */
export class ServiceController<T, CustomEvent = unknown> {
  #gridController: GridController<T, CustomEvent>[] = [];
  #eventHandler: ServiceEventHandler<T, CustomEvent>;

  connectDataSource(dataController: GridController<T, CustomEvent>) {
    this.#gridController.push(dataController);
  }

  async callEventHandlerCustom(event: CustomEvent) {
    if (!this.#eventHandler.handleEventCustom) {
      console.error("MISSING CUSTOM EVENT HANDLER"); // so dev know
      return;
    }
    await this.#eventHandler.handleEventCustom(this, event);
  }

  async callEventHandler(event: ControllerEvent<T>) {
    await this.#eventHandler.handleEvent(this, event);
  }

  getLinkedGridControllers() {
    return this.#gridController;
  }

  constructor(eventHandler: ServiceEventHandler<T, CustomEvent>) {
    this.#eventHandler = eventHandler;
  }
}

/////////////////////////////////////////////
// helper classes, dont want 1 file per
//////////////////////////////////////////////

export type ServiceEventHandler<T, U> = {
  handleEventCustom?: (
    service: ServiceController<T, U>,
    event: U,
  ) => Promise<void>;
  handleEvent: (
    service: ServiceController<T, U>,
    event: ControllerEvent<T>,
  ) => Promise<void>;
};
