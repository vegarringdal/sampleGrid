import { serviceStore } from "../../state/serviceStore";
import { ServiceController } from "../common/ServiceController";
import { DuplicateTemplateLineEvent } from "../customEvents/DuplicateTemplateLineEvent";
import { TemplateEntity } from "../entities/TemplateEntity";
import { templateLineService } from "../services/templateLineService";
import { templateService } from "../services/templateService";
import { templateLineServiceController } from "./templateLineServiceController";

export const templateServiceController = new ServiceController<
  TemplateEntity,
  DuplicateTemplateLineEvent
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

    if (event.type === "FETCH_ALL") {
      //
      serviceStore.setState({
        loadingDataDialogActivated: true,
        loadingDataDialogContent: "loading data, please wait",
      });

      // add error handling, really want all services to return Result<OK, ERRORSTRING> kinda like rust
      const resultTemplates = await templateService.getAll("dummyProjectCode");

      // fetch template lines at the same time when refreshing
      // since it will be very few rows, fetching from service sould prb be just as good..
      // and I should fetch them in parallel
      const resultTemplatesLines =
        await templateLineService.getAll("dummyProjectCode");

      templateLineServiceController.getLinkedGridControllers().forEach((dc) => {
        dc.getGridDatasource().setData(resultTemplatesLines);
      });

      serviceController.getLinkedGridControllers().forEach((dc) => {
        dc.getGridDatasource().setData(resultTemplates);
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
