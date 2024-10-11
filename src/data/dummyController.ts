import { getDummyData } from "../dummyData";
import { DataController } from "../utils/DataController";
import { ServiceController } from "../utils/ServiceController";

type dummyEntity = {
  ID: string;
  STATUS: string;
  DATE: Date;

  LINE_EQUIPMENT: string;
  TAG_NO: string;
};

export function generateDummyController() {
  const equipmentServiceController = new ServiceController<dummyEntity>({
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

  /**
   *
   */
  const dummyDataController = new DataController<dummyEntity>(
    {
      primaryColumn: "ID",
      columns: [
        {
          attribute: "ID",
          type: "number",
        },
        {
          attribute: "STATUS",
          type: "text",
        },
        {
          attribute: "TAG_NO",
          type: "text",
        },
        {
          attribute: "DESCRIPTION",
          type: "text",
        },
        {
          attribute: "LINE_EQUIPMENT",
          type: "text",
        },
        {
          attribute: "DOCID",
          type: "text",
        },
        {
          attribute: "CREATED",
          type: "date",
        },
      ],
    },
    equipmentServiceController
  );

  return dummyDataController;
}
