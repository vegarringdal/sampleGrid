import { create } from "zustand";

type modeState = {
  isDarkTheme: boolean;
};

export const modeStore = create<modeState>(() => ({
  isDarkTheme: true,
}));
