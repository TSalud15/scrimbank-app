import { axiosInstance } from "@/lib/axios";
import { PracticeSession, SessionFormData } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface SessionStore {
    practiceSessions: PracticeSession[];
    isLoading: boolean;
    error: string | null;

    fetchPracticeSessions: () => Promise<void>;
    addPracticeSession: (session: SessionFormData) => Promise<void>;
    deletePracticeSession: (id: string) => Promise<void>;
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
            console.log("Error fetching practice sessions: ", error);
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    addPracticeSession: async (session: SessionFormData) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();

            formData.append("name", session.name);
            formData.append("date", session.date.toISOString());

            const res = await axiosInstance.post("/sessions", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const newSession = res.data;

            set((state) => ({
                practiceSessions: [newSession, ...state.practiceSessions],
            }));

            toast.success("New session was created");
        } catch (error) {
            console.log("Error adding practice session: ", error);
            toast.error("Error adding practice session");
        } finally {
            set({ isLoading: false });
        }
    },

    deletePracticeSession: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/sessions/${id}`);
            //TODO: Update state to delete scrims under session
            set((state) => ({
                practiceSessions: state.practiceSessions.filter(
                    (session) => session._id !== id
                ),
            }));

            toast.success("Session deleted successfully");
        } catch (error: any) {
            console.log("Error deleting practice session: ", error);
            toast.error("Error deleting practice session");
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
