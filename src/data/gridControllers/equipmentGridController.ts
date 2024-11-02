import { GridController } from "../common/GridController";
import { EquipmentEntity } from "../entities/EquipmentEntity";
import { equipmentServiceController } from "../serviceControllers/equipmentServiceController";

export const equipmentGridController = new GridController<EquipmentEntity>(
  {
    isDeleteAllowed: true,
    isNewAllowed: true,
    isEditAllowed: true,
    primaryColumn: "id",
    columns: [
      {
        attribute: "id",
        type: "number",
        readOnly: true,
        // maybe option for width here, but groupcell overrides it?
      },
      {
        attribute: "tag",
        type: "text",
        mandatory: true,
        showInImport: { before: true, orderBy: 0 },
      },
      {
        attribute: "const",
        type: "text",
        showInImport: { before: false, orderBy: 0 },
      },
      {
        attribute: "design",
        type: "text",
        showInImport: { before: false, orderBy: 1 },
      },
      {
        attribute: "serviceDescription1",
        type: "text",
      },
      {
        attribute: "serviceDescription2",
        type: "text",
      },
      {
        attribute: "site",
        type: "text",
      },
      {
        attribute: "designCode",
        type: "text",
      },
      {
        attribute: "areaCode",
        type: "text",
      },
      {
        attribute: "systemCode",
        type: "text",
      },
      {
        attribute: "id",
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
        clearIfCopy: true,
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
        attribute: "modified",
        type: "date",
        readOnly: true,
      },
      {
        attribute: "created",
        type: "date",
        readOnly: true,
      },
      {
        attribute: "createdBy",
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
      {
        attribute: "source",
        type: "text",
      },
    ],
    // maybe groupcells should have these ?
    colWidth: [130, 250, 80, 130, 100, 120, 65, 65, 65, 65, 200, 200, 200, 120],
    groupCells: [
      ["tag", "comment"],
      ["serviceDescription1", "serviceDescription2"],
      ["dicipline", "source"],
      ["const", "design", "site"],
      ["designCode", "areaCode", "systemCode"],
      ["mc", "com"],
      ["op01", "op02", "op03", "op04"],
      ["op05", "op06", "op07", "op08"],
      ["op09", "op10", "op11", "op12"],
      ["op13", "op14", "op15", "op16"],
      ["extString01", "extString02", "extString03", "extString04"],
      ["extString05", "extString06", "extString07", "extString08"],
      ["created", "createdBy", "modified", "modifiedBy"],
      ["id"],
    ],
  },
  equipmentServiceController,
);
