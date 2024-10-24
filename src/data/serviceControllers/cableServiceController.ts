import { loadingDialogStore } from "../../state/loadingDialogStore";
import { ServiceController } from "../common/ServiceController";
import { CreateTagoperationsEvent } from "../customEvents/createTagOperations";
import { CableEntity } from "../entities/cableEntity";
import { cableService } from "../services/cableService";

/**
 * handles event from dataController
 * use this to call service
 */
export const cableServiceController = new ServiceController<
  CableEntity,
  CreateTagoperationsEvent
>({
  handleEventCustom: async (service, event) => {
    console.log("EVENT_TYPE", event.type);
    console.log("EVENT_DATA", event.data);
    console.log("EVENT_SERVICE", service);
  },

  handleEvent: async (service, event) => {
    // loop changes
    console.log("EVENT_TYPE", event.type);
    console.log("EVENT_DATA", event.data);
    console.log("EVENT_SERVICE", service);

    // dunno what events I want yet

    if (event.type === "FETCH_ALL") {
      //
      loadingDialogStore.setState({
        isActive: true,
        content: "loading data, please wait",
      });

      // add error handling, really want all services to return Result<OK, ERRORSTRING> kinda like rust
      const result = await cableService.getAll("TODO:PROJECT_CODE");

      // update all related datasources
      service.getDataControllers().forEach((dc) => {
        dc.getGridDatasource().setData(result);
      });

      loadingDialogStore.setState({ isActive: false });
    }

    if (event.type === "REFRESH_ALL") {
      // call get all and update service connected datasources
    }

    if (event.type === "CHANGE") {
      // call get all and update service connected datasources
    }
  },
});
