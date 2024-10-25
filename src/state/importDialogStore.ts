import { create } from "zustand";

type importDialogStore = {
  activated: boolean;
  close: () => void;
  open: () => void;
};

/**
 * controls import dialog state
 */
export const importDialogStore = create<importDialogStore>((set) => ({
  activated: false,
  close: () => set(() => ({ activated: false })),
  open: () => set(() => ({ activated: true })),
}));
