import { GridController } from "../utils/GridController";
import { equipmentEntity } from "../entities/equipmentEntity";
import { equipmentServiceController } from "../serviceController/equipmentServiceController";

/**
 *
 */
export const equipmentDataController = new GridController<equipmentEntity>(
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
