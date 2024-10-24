import { DummyData, getDummyData } from "../../utils/mockdata/dummyData";
import { GridController } from "../../utils/GridController";
import { ServiceController } from "../../utils/ServiceController";

export function generateDummyController() {
  const equipmentServiceController = new ServiceController<DummyData>({
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
        service.getDataControllers().forEach((dc) => {
          dc.getGridDatasource().setData(getDummyData());
        });
      }

      if (event.type === "CHANGE") {
        // call get all and update service connected datasources
      }
    },
  });

  /**
   *
   */
  const dummyDataController = new GridController<DummyData>(
    {
      isDeleteAllowed: true,
      isNewAllowed: true,
      isEditAllowed: true,
      primaryColumn: "id",
      columns: [
        {
          attribute: "id",
          type: "text",
        },
        {
          attribute: "desc",
          type: "text",
        },
        {
          attribute: "type",
          type: "text",
        },
        {
          attribute: "dim",
          type: "text",
        },
        {
          attribute: "comment",
          type: "text",
        },
      ],
    },
    equipmentServiceController
  );

  return dummyDataController;
}
