import { Scrim } from "@/types";
import { create } from "zustand";

interface ScrimStore {
    currentScrim: Scrim | null;
}

export const useScrimStore = create<ScrimStore>((set) => ({
    currentScrim: null,
}));
