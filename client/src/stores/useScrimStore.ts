import { Scrim } from "@/types";
import { create } from "zustand";

interface ScrimFormData {
    name: string;
    map: string;
    date: Date;
    notes?: string[];
}

interface ScrimStore {
    currentScrim: Scrim | null;

    isLoading: boolean;
    error: string | null;

    addScrim: (scrim: ScrimFormData) => Promise<void>;
}

export const useScrimStore = create<ScrimStore>((set) => ({
    currentScrim: null,

    isLoading: false,
    error: null,

    addScrim: async (scrim: ScrimFormData) => {
        set({ isLoading: true, error: null });
    },
}));
