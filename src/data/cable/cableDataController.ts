import { DataController } from "../../utils/DataController";
import { cableEntity } from "./cableEntity";
import { cableServiceController } from "./cableServiceController";

/**
 *
 */
export const cableDataController = new DataController<cableEntity>(
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
        mandatory: true,
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
  cableServiceController
);
