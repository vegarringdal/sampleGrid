import { create } from "zustand";
import { GridControllerTypes } from "../data/gridControllers";

type RelatedDialogState = {
  toSource: keyof GridControllerTypes | null;
  fromSource: keyof GridControllerTypes | null;
  title: string;
  columnFrom: string;
  columnTo: string;
  columnsFromTo?: string[][];
  active: boolean;
  activateRelatedDialog: (
    toSource: keyof GridControllerTypes,
    fromSource: keyof GridControllerTypes,
    title: string,
    columnFrom: string,
    columnTo: string,
    columnsFromTo: string[][],
  ) => void;
  deactivateRelatedDialog: () => void;
};

/**
 * keeps track of child/parent sources/columns
 * we use this to control the related dialog
 */
export const relatedDialogStore = create<RelatedDialogState>((set) => ({
  toSource: null,
  fromSource: null,
  title: "",
  active: false,
  columnFrom: "",
  columnTo: "",
  columnsFromTo: [],
  activateRelatedDialog: (
    toSource: keyof GridControllerTypes,
    fromSource: keyof GridControllerTypes,
    title: string,
    columnFrom: string,
    columnTo: string,
    columnsFromTo: string[][],
  ) =>
    set(() => ({
      toSource,
      fromSource,
      title,
      columnFrom,
      columnTo,
      columnsFromTo,
      active: true,
    })),
  deactivateRelatedDialog: () => set(() => ({ active: false })),
}));
