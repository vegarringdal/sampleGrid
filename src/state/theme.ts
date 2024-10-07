import { create } from "zustand";

type modeState = {
  isDarkTheme: boolean;
};

export const themeStore = create<modeState>(() => ({
  isDarkTheme: true,
}));
