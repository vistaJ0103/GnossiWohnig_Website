import { create } from "zustand";

export const useAuthErrStore = create((set) => ({
  err: null,
}));

export const usePasswordResetSuccessStore = create((set) => ({
  res: null,
}));
