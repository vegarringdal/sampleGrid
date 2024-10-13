import { create } from "zustand";

type state = {
  isActive: boolean;
  header: string;
  content: string
};

export const loadingDialogStore = create<state>(() => ({
  isActive: false,
  header: "Loading",
  content: "Please wait"
}));
