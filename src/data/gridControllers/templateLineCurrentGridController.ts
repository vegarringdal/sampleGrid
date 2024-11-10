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
        // missing dummy data
        parentDataInterface: {
          ref: "opCodesDialog",
          title: "Select Operation Code",
          columnFrom: "modifiedBy",
          columnTo: "op",
          columnsFromTo: [["modifiedBy", "op"]],
        },
      },
      {
        attribute: "compcode",
        type: "text",
        // missing dummy data
        parentDataInterface: {
          ref: "compcodesDialog",
          title: "Select Compensation Code",
          columnFrom: "modifiedBy",
          columnTo: "compcode",
          columnsFromTo: [["modifiedBy", "compcode"]],
        },
      },
      {
        attribute: "compDesc",
        type: "text",
        readOnly: true,
      },
      {
        attribute: "factor",
        type: "text",
        //missing dummy data
        parentDataInterface: {
          ref: "factorDialog",
          title: "Select Compensation factor",
          columnFrom: "modifiedBy",
          columnTo: "factor",
          columnsFromTo: [["modifiedBy", "factor"]],
        },
      },
      {
        attribute: "task",
        type: "text",
        //missing dummy data
        parentDataInterface: {
          ref: "taskDialog",
          title: "Select Task",
          columnFrom: "modifiedBy",
          columnTo: "task",
          columnsFromTo: [["modifiedBy", "task"]],
        },
      },
      {
        attribute: "workpack",
        type: "text",
        //missing dummy data
        parentDataInterface: {
          ref: "workpackDialog",
          title: "Select Workpack",
          columnFrom: "modifiedBy",
          columnTo: "workpack",
          columnsFromTo: [["modifiedBy", "workpack"]],
        },
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
    colWidth: [85, 120, 120, 120, 250],
    groupCells: [
      ["op", "opNo"],
      ["task", "workpack"],
      ["compcode", "factor"],
      ["quantity"],
      ["compDesc"],
      ["id"],
    ],
  },
  templateLineServiceController, //  I might want to have a own service controller here
);
