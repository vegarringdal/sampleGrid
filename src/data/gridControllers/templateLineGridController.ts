import { GridController } from "../common/GridController";
import { CreateTagoperationsEvent } from "../customEvents/CreateTagoperationsEvent";
import { TemplateLineEntity } from "../entities/TemplateLineEntity";
import { templateLineServiceController } from "../serviceControllers/templateLineServiceController";

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
      },
      {
        attribute: "templateID",
        type: "number",
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
      },
      {
        attribute: "modifiedBy",
        type: "text",
      },
      {
        attribute: "modified",
        type: "date",
      },
      {
        attribute: "created",
        type: "date",
      },
    ],
  },
  templateLineServiceController,
);
