import { create } from "zustand";

type State = {
  isSidebarMenuOpen: boolean;
};

type Actions = {
  toggleSidebarMenu: () => void;
};

export const useSidebarState = create<State & Actions>((set) => ({
  isSidebarMenuOpen: false,
  toggleSidebarMenu: () =>
    set((state) => ({ isSidebarMenuOpen: !state.isSidebarMenuOpen })),
}));
