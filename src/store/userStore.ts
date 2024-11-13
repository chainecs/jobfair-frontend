import { IUser } from "@/@types/IUser";
import { create } from "zustand";

type UserState = {
  user: IUser | null;
  setUser: (userData: IUser) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData) => {
    set({ user: userData });
  },
  clearUser: () => set({ user: null }),
}));
