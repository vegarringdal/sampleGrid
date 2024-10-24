export type CreateTagoperationsEvent = {
  type: "CREATE_TAGOP";
  data: {
    tag: number;
    compId: number;
    workpackId: number;
    taskId: number;
    opcodeId: number;
    factorId: number;
    plannedQty: number;
  }[];
};
