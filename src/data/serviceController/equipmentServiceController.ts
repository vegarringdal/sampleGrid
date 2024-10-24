import { getDummyData } from "../../utils/mockdata/dummyData";
import { ServiceController } from "../utils/ServiceController";
import { equipmentEntity } from "../entities/equipmentEntity";

/**
 * handles event from dataController
 * use this to call service
 */
export const equipmentServiceController =
  new ServiceController<equipmentEntity>({
    handleEvent: async (service, event) => {
      // loop changes
      console.log("EVENT_TYPE", event.type);
      console.log("EVENT_DATA", event.data);
      console.log("EVENT_SERVICE", service);

      // dunno what events I want yet

      if (event.type === "FETCH_ALL") {
        // call get all and update service connected datasources

        service.getDataControllers().forEach((dc) => {
          dc.getGridDatasource().setData(getDummyData());
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
