import { GridController } from "../common/GridController";
import { PrintWorkpackEvent } from "../customEvents/PrintWorkpackEvent";
import { WorkpackEntity } from "../entities/WorkpackEntity";
import { workpackServiceController } from "../serviceControllers/workpackServiceController";

export const workpackDialogGridController = new GridController<
  WorkpackEntity,
  PrintWorkpackEvent
>(
  // config here should prb be shared between both workpack controllers
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
      },
      {
        attribute: "name",
        type: "text",
      },
      {
        attribute: "description",
        type: "text",
      },
      {
        attribute: "printDesciption",
        type: "text",
      },
      {
        attribute: "status",
        type: "text",
      },
      {
        attribute: "workprepStatus",
        type: "text",
      },
      {
        attribute: "completed",
        type: "boolean",
      },
      {
        attribute: "plannedMhr",
        type: "number",
        readOnly: true,
      },
      {
        attribute: "plannedMhr",
        type: "number",
        readOnly: true,
      },
      {
        attribute: "workprepHoldTitle",
        type: "text",
      },
      {
        attribute: "workprepHoldDecription",
        type: "text",
      },
      {
        attribute: "workprepComment",
        type: "text",
      },
      {
        attribute: "formanHoldTitle",
        type: "text",
      },
      {
        attribute: "formanHoldDesctiption",
        type: "text",
      },
      {
        attribute: "formanComment",
        type: "text",
      },
      {
        attribute: "forman",
        type: "text",
      },
      {
        attribute: "formanId",
        type: "number",
        hide: true,
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
    ],
    // maybe groupcells should have these ?
    colWidth: [120, 180],
    groupCells: [
      ["name"],
      ["description"],
      ["forman"],
      ["plannedMhr", "earnedMhr"],
      ["status", "workprepStatus"],
      ["created", "createdBy"],
      ["modified", "modifiedBy"],
      ["id"],
    ],
  },
  workpackServiceController,
);
