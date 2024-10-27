import { GridController } from "../common/GridController";
import { DuplicateTemplateLineEvent } from "../customEvents/duplicateTemplate";
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
        attribute: "id",
        type: "number",
      },
      {
        attribute: "desc",
        type: "text",
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
  templateServiceController
);
