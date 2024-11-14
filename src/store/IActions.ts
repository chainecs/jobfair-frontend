import { StateCreator } from "zustand";

export type IActions<T extends object, U extends object> = (
  set: (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void
) => U;
