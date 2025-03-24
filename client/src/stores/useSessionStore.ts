import { axiosInstance } from "@/lib/axios";
import { PracticeSession, Scrim } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface SessionFormData {
    name: string;
    date: Date;
}

interface SessionStore {
    practiceSessions: PracticeSession[];
    currentSession: PracticeSession | null;
    scrims: Scrim[];

    isLoading: boolean;
    error: string | null;

    fetchPracticeSessions: () => Promise<void>;
    fetchPracticeSessionById: (id: string) => Promise<void>;
    addPracticeSession: (session: SessionFormData) => Promise<void>;
    updatePracticeSession: (
        id: string,
        session: SessionFormData
    ) => Promise<void>;
    deletePracticeSession: (id: string) => Promise<void>;
}

export const useSessionStore = create<SessionStore>((set) => ({
    // initial state
    practiceSessions: [],
    currentSession: null,
    scrims: [],

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

    fetchPracticeSessionById: async (id) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axiosInstance.get(`/sessions/${id}`);
            set({ currentSession: res.data });
        } catch (error: any) {
            console.log("Error fetching practice session: ", error);
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
        } catch (error: any) {
            toast.error("Error adding practice session");
            console.log("Error adding practice session: ", error);
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    updatePracticeSession: async (id, session) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();

            formData.append("name", session.name);
            formData.append("date", session.date.toISOString());

            const res = await axiosInstance.patch(`/sessions/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // update session in state
            const updatedSession = res.data;

            set((state) => ({
                practiceSessions: state.practiceSessions.map((session) =>
                    session._id === id ? updatedSession : session
                ),
            }));

            toast.success("Session changes were saved");
        } catch (error: any) {
            toast.error("Error adding practice session");
            console.log("Error updating practice session: ", error);
            console.log(typeof session.date);
            set({ error: error.response.data.message });
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
