import { GridController, ControllerEvent } from "./GridController";

/**
 * helper for service
 * no need for editing
 * one service might serve multiple grid controllers.
 */
export class ServiceController<T, E = unknown> {
  #dataController: GridController<T, E>[] = [];
  #eventHandler: ServiceEventHandler<T, E>;

  connectDataSource(dataController: GridController<T, E>) {
    this.#dataController.push(dataController);
  }

  async callEventHandlerCustom(event: E) {
    if (!this.#eventHandler.handleEventCustom) {
      console.error("MISSING CUSTOM EVENT HANDLER");
      return;
    }
    await this.#eventHandler.handleEventCustom(this, event);
  }

  async callEventHandler(event: ControllerEvent<T>) {
    await this.#eventHandler.handleEvent(this, event);
  }

  getDataControllers() {
    return this.#dataController;
  }

  constructor(eventHandler: ServiceEventHandler<T, E>) {
    this.#eventHandler = eventHandler;
  }
}

/////////////////////////////////////////////
// helper classes, dont want 1 file per
//////////////////////////////////////////////

export type ServiceEventHandler<T, U> = {
  handleEventCustom?: (
    service: ServiceController<T, U>,
    event: U
  ) => Promise<void>;
  handleEvent: (
    service: ServiceController<T, U>,
    event: ControllerEvent<T>
  ) => Promise<void>;
};
