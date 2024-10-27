import { GridController } from "../common/GridController";
import { DuplicateTemplateLineEvent } from "../customEvents/DuplicateTemplateLineEvent";
import { TemplateEntity } from "../entities/TemplateEntity";
import { templateServiceController } from "../serviceControllers/templateServiceController";

export const templateGridController = new GridController<
  TemplateEntity,
  DuplicateTemplateLineEvent
>(
  {
    isDeleteAllowed: true,
    isNewAllowed: true,
    isEditAllowed: true,
    primaryColumn: "id",
    columns: [
      {
        attribute: "desc",
        type: "text",
      },
      {
        attribute: "createdBy",
        type: "text",
        hide: true,
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
        hide: true,
      },
      {
        attribute: "id",
        type: "number",
        hide: true,
      },
    ],
    colWidth: [350],
  },
  templateServiceController,
);
