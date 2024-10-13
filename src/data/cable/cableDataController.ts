import { DataController } from "../../utils/DataController";
import { CableEntity } from "./cableEntity";
import { cableServiceController } from "./cableServiceController";

/**
 * This helps setup grid /configure it
 * It will also call service controller when needed
 */
export const cableDataController = new DataController<CableEntity>(
  {
    primaryColumn: "id",
    columns: [
      {
        attribute: "id",
        type: "number",
        readOnly: true,
      },
      {
        attribute: "tag",
        type: "text",
        mandatory: true,
      },
      {
        attribute: "fromTag",
        type: "text",
      },
      {
        attribute: "areaFrom",
        type: "text",
      },
      {
        attribute: "toTag",
        type: "text",
      },
      {
        attribute: "areaTo",
        type: "text",
      },
      {
        attribute: "const",
        type: "text",
      },
      {
        attribute: "design",
        type: "text",
      },
      {
        attribute: "site",
        type: "text",
      },
      {
        attribute: "cableTypeId",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "cableType",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "cableTypeDim",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "mc",
        type: "text",
      },
      {
        attribute: "com",
        type: "text",
      },
      {
        attribute: "op01",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op02",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op03",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op04",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op05",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op06",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op07",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op08",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op09",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op10",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op11",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op12",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op13",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "op14",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "modifiedBy",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "dicipline",
        type: "text",
      },
      {
        attribute: "status",
        type: "text",
      },
      {
        attribute: "modifiedBy",
        type: "text",
      },
      {
        attribute: "termFrom",
        type: "text",
      },
      {
        attribute: "partAddressFrom",
        type: "text",
      },
      {
        attribute: "termTo",
        type: "text",
      },
      {
        attribute: "partAddressTo",
        type: "text",
      },
      {
        attribute: "comment",
        type: "text",
      },
      {
        attribute: "extString01",
        type: "text",
      },
      {
        attribute: "extString02",
        type: "text",
      },
      {
        attribute: "extString03",
        type: "text",
      },
      {
        attribute: "extString04",
        type: "text",
      },
      {
        attribute: "extString05",
        type: "text",
      },
      {
        attribute: "extString06",
        type: "text",
      },
      {
        attribute: "extString07",
        type: "text",
      },
      {
        attribute: "extString08",
        type: "text",
      },
      {
        attribute: "extString09",
        type: "text",
      },
      {
        attribute: "extString10",
        type: "text",
      },
    ],
    colWidth: [130, 80, 150, 130, 100, 150,120, 65, 65, 65, 200, 200, 120],
    groupCells: [
      ["tag", "comment"],
      ["status", "dicipline", "source"],
      ["cableType", "cableTypeDim"],
      ["fromTag", "areaFrom", "toTag", "areaTo"],
      ["const", "design", "site"],
      ["termFrom", "partAddressFrom", "termTo", "partAddressTo"],
      ["mc", "com"],
      ["op01", "op02", "op03", "op04"],
      ["op05", "op06", "op07", "op08"],
      ["op09", "op10", "op11", "op12"],
      ["extString01", "extString02", "extString03", "extString04"],
      ["extString05", "extString06", "extString07", "extString08"],
      ["created", "createdBy", "modified", "modifiedBy"],
    ],
  },
  cableServiceController
);
