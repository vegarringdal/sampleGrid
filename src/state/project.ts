import { create } from "zustand";

type state = {
  code: string | null;
};

export const projectStore = create<state>(() => ({
  code: null,

  // should add a method here to update window and set tab/global state
}));
