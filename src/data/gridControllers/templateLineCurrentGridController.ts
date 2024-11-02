import { GridController } from "../common/GridController";
import { CreateTagoperationsEvent } from "../customEvents/CreateTagoperationsEvent";
import { TemplateLineEntity } from "../entities/TemplateLineEntity";
import { templateLineServiceController } from "../serviceControllers/templateLineServiceController";

// todo, share between templateline and templatelinecurrent
// just need to create workpack, task, factor and op codes api first to see how I want this

export const templateLineCurrentGridController = new GridController<
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
  templateLineServiceController, //  I might want to have a own service controller here
);
