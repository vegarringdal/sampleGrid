import { create } from "zustand";
import { sourceNames } from "../data/sources";

type RelatedDialogState = {
    toSource: keyof sourceNames | null;
    fromSource: keyof sourceNames | null;
    title: string;
    columnFrom: string;
    columnTo: string;
    columnsFromTo?: string[][];
    active: boolean;
    activateRelatedDialog: (
        toSource: keyof sourceNames ,
        fromSource: keyof sourceNames,
        title: string,
        columnFrom: string,
        columnTo: string,
        columnsFromTo: string[][]
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
        toSource: keyof sourceNames ,
        fromSource: keyof sourceNames,
        title: string,
        columnFrom: string,
        columnTo: string,
        columnsFromTo: string[][]
    ) =>
        set(() => ({
            toSource,
            fromSource,
            title,
            columnFrom,
            columnTo,
            columnsFromTo,
            active: true
        })),
    deactivateRelatedDialog: () => set(() => ({ active: false }))
}));