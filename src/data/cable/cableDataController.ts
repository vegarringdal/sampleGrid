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
  cableServiceController
);
