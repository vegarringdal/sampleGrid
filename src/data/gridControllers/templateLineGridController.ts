import { GridController } from "../common/GridController";
import { CreateTagoperationsEvent } from "../customEvents/CreateTagoperationsEvent";
import { TemplateLineEntity } from "../entities/TemplateLineEntity";
import { templateLineServiceController } from "../serviceControllers/templateLineServiceController";

// todo:
// need to figure out how I want this one to work
// it will be mostly a background controller, since TemplateLineCurrent will be the one user sees
// templateLine and template line currrent should also share grid config

export const templateLineGridController = new GridController<
  TemplateLineEntity,
  CreateTagoperationsEvent
>(
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
        attribute: "templateID",
        type: "number",
        readOnly: true,
      },
      {
        attribute: "opNo",
        type: "number",
      },

      {
        attribute: "op",
        type: "text",
        // todo, add need related
      },
      {
        attribute: "compcode",
        type: "text",
        // todo, add need related
      },
      {
        attribute: "compDesc",
        type: "text",
      },
      {
        attribute: "factor",
        type: "text",
        // todo, add need related
      },
      {
        attribute: "task",
        type: "text",
        // todo, add need related
      },
      {
        attribute: "workpack",
        type: "text",
        // todo, add need related
      },
      {
        attribute: "quantity",
        type: "number",
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
        attribute: "modified",
        type: "date",
        readOnly: true,
      },
      {
        attribute: "created",
        type: "date",
        readOnly: true,
      },
    ],
  },
  templateLineServiceController,
);
