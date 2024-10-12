import { ServiceController } from "../../utils/ServiceController";
import { CableEntity } from "./cableEntity";
import { cableService } from "./cableService";

/**
 * handles event from dataController
 * use this to call service
 */
export const cableServiceController = new ServiceController<CableEntity>({
  handleEvent: async (service, event) => {
    // loop changes
    console.log("EVENT_TYPE", event.type);
    console.log("EVENT_DATA", event.data);
    console.log("EVENT_SERVICE", service);

    // dunno what events I want yet

    if (event.type === "FETCH_ALL") {
      // call get all and update service connected datasources

      const result = await cableService.getAll("TODO");
  

      service.getDataControllers().forEach((dc) => {
        dc.getGridDatasource().setData(result);
      });
    }

    if (event.type === "REFRESH_ALL") {
      // call get all and update service connected datasources
    }

    if (event.type === "CHANGE") {
      // call get all and update service connected datasources
    }
  },
});
