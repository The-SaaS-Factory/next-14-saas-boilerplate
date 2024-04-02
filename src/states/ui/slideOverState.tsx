import { create } from "zustand";

type State = {
  isSideOverOpen: boolean;
};

type Actions = {
  toggleSideOver: () => void;
};

export const useSideOverState = create<State & Actions>((set) => ({
  isSideOverOpen: false,
  toggleSideOver: () =>
    set((state) => ({ isSideOverOpen: !state.isSideOverOpen })),
}));
