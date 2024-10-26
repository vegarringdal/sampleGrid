import { GridController } from "../common/GridController";
import { equipmentEntity } from "../entities/equipmentEntity";
import { equipmentServiceController } from "../serviceControllers/equipmentServiceController";

export const equipmentGridController = new GridController<equipmentEntity>(
  {
    isDeleteAllowed: true,
    isNewAllowed: true,
    isEditAllowed: true,
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
        attribute: "LINE_EQUIPMENT",
        type: "text",
      },
    ],
  },
  equipmentServiceController,
);
