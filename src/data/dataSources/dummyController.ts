import { DummyData, getDummyData } from "../../dummyData";
import { DataController } from "../common/DataController";
import { ServiceController } from "../common/ServiceController";

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
        service.getLinkedGridControllers().forEach((dc) => {
          dc.getGridDatasource().setData(getDummyData());
        });
      }

      if (event.type === "REFRESH_ALL") {
        // call get all and update service connected datasources
        service.getLinkedGridControllers().forEach((dc) => {
          dc.getGridDatasource().setData(getDummyData());
        });
      }

      if (event.type === "CHANGE") {
        // call get all and update service connected datasources
      }
    },
  });

  let i: string = 1;

  /**
   *
   */
  const dummyDataController = new DataController<DummyData>(
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
