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
        type: "string",
      },
      {
        attribute: "TAG_NO",
        type: "string",
      },
      {
        attribute: "DESCRIPTION",
        type: "string",
      },
      {
        attribute: "LINE_EQUIPMENT",
        type: "string",
      },
      {
        attribute: "DOCID",
        type: "string",
      },
    ],
  },
  equipmentServiceController
);
