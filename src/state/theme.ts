import { create } from "zustand";

type state = {
  isDarkTheme: boolean;
};

export const themeStore = create<state>(() => ({
  isDarkTheme: true,
}));
