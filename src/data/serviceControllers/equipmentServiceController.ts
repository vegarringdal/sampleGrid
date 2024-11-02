import { serviceStore } from "../../state/serviceStore";
import { ServiceController } from "../common/ServiceController";
import { EquipmentEntity } from "../entities/EquipmentEntity";
import { equipmentService } from "../services/equipmentService";

export const equipmentServiceController =
  new ServiceController<EquipmentEntity>({
    handleEvent: async (service, event) => {
      // loop changes
      console.log("EVENT_TYPE", event.type);
      console.log("EVENT_DATA", event.data);
      console.log("EVENT_SERVICE", service);

      // dunno what events I want yet

      if (event.type === "FETCH_ALL") {
        //
        serviceStore.setState({
          loadingDataDialogActivated: true,
          loadingDataDialogContent: "loading data, please wait",
        });

        // add error handling, really want all services to return Result<OK, ERRORSTRING> kinda like rust
        const result = await equipmentService.getAll("dummyProjectCode");

        // update all related datasources
        service.getLinkedGridControllers().forEach((dc) => {
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
