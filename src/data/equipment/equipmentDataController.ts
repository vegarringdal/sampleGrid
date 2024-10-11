import { DataController } from "../../utils/DataController";
import { equipmentEntity } from "./equipmentEntity";
import { equipmentServiceController } from "./equipmentServiceController";

/**
 *
 */
export const equipmentDataController = new DataController<equipmentEntity>(
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
