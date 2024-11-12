export type PrintWorkpackEvent = {
  type: "PRINT_WORKPACK";
  data: {
    workpackId: number;
  }[];
};
