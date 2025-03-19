import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface SessionStore {
    practiceSessions: any[];
    isLoading: boolean;
    error: string | null;

    fetchPracticeSessions: () => Promise<void>;
}

export const useSessionStore = create<SessionStore>((set) => ({
    practiceSessions: [],
    isLoading: false,
    error: null,

    fetchPracticeSessions: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await axiosInstance.get("/sessions");
            set({ practiceSessions: res.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
