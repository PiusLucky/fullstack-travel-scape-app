import { atom } from "jotai";

// Default values
const sidebarMinimizedDefault = false;

export const ATOMS = {
  user: atom({
    name: "",
    email: "",
    credit: 0,
  }),
  sidebarMinimized: atom(sidebarMinimizedDefault),
};
