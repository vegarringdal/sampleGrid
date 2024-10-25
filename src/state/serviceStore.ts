import { create } from "zustand";

type serviceState = {
    // loading
    loadingDataDialogActivated: boolean;
    loadingDataDialogContent: string | null;
    loadingDataDialogHeader: string | null;
    loadingDataRuntimeMilliseconds: number;
    loadingDataReplyMilliseconds: number;
    loadingDataRowCount: number;
    activateLoadingData: () => void;
    deactivateLoadingData: () => void;

    //error
    errorDialogHeader: string | null;
    errorDialogContent: string | null;
    errorDialogActivated: boolean;
    activateErrorDialog: () => void;
    deactivateErrorDialog: () => void;
};

/**
 * this state holds loading data and error data
 */
export const serviceStore = create<serviceState>((set) => ({
    // loading
    loadingDataDialogActivated: false,
    loadingDataDialogContent: "",
    loadingDataDialogHeader: "",
    loadingDataRuntimeMilliseconds: 0,
    loadingDataReplyMilliseconds: 0,
    loadingDataRowCount: 0,
    activateLoadingData: () => set(() => ({ loadingDataDialogActivated: true })),
    deactivateLoadingData: () => set(() => ({ loadingDataDialogActivated: false })),

    //error
    errorDialogHeader: "",
    errorDialogContent: "",
    errorDialogActivated: false,
    activateErrorDialog: () => set(() => ({ errorDialogActivated: true })),
    deactivateErrorDialog: () => set(() => ({ errorDialogActivated: false }))
}));