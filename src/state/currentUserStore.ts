import { create } from "zustand";

type state = {
  name: string;
};

export const currentUserStore = create<state>(() => ({
  name: "",
}));
