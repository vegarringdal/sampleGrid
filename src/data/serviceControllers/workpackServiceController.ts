import { serviceStore } from "../../state/serviceStore";
import { ServiceController } from "../common/ServiceController";
import { PrintWorkpackEvent } from "../customEvents/PrintWorkpackEvent";
import { WorkpackEntity } from "../entities/WorkpackEntity";
import { workpackService } from "../services/workpackService";

export const workpackServiceController = new ServiceController<
  WorkpackEntity,
  PrintWorkpackEvent
>({
  handleEventCustom: async (serviceController, event) => {
    console.log("EVENT_TYPE", event.type);
    console.log("EVENT_DATA", event.data);
    console.log("EVENT_SERVICE", serviceController);
  },

  handleEvent: async (serviceController, event) => {
    // loop changes
    console.log("EVENT_TYPE", event.type);
    console.log("EVENT_DATA", event.data);
    console.log("EVENT_SERVICE", serviceController);

    // dunno what events I want yet

    if (event.type === "FETCH_ALL" || event.type === "REFRESH_ALL") {
      //
      serviceStore.setState({
        loadingDataDialogActivated: true,
        loadingDataDialogContent: "loading data, please wait",
      });

      // add error handling, really want all services to return Result<OK, ERRORSTRING> kinda like rust
      const result = await workpackService.getAll("dummyProjectCode");

      // update all related datasources
      serviceController.getLinkedGridControllers().forEach((dc) => {
        dc.getGridDatasource().setData(result);
      });

      serviceStore.setState({ loadingDataDialogActivated: false });
    }

    if (event.type === "REFRESH_ALL") {
      // call get all and update service connected datasources
    }

    if (event.type === "CHANGE") {
      // call get all and update service connected datasources
    }
  },
});
