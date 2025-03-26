import { axiosInstance } from "@/lib/axios";
import { PracticeSession, Scrim } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface SessionFormData {
    name: string;
    date: Date;
}

interface ScrimFormData {
    name: string;
    map: string;
    date: Date;
    notes?: string;
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

    addScrim: (sessionId: string | null, scrim: ScrimFormData) => Promise<void>;
    deleteScrim: (id: string) => Promise<void>;
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
            set({ currentSession: res.data, scrims: res.data.scrims });
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

    addScrim: async (sessionId, scrim) => {
        set({ isLoading: true, error: null });

        const formData = new FormData();

        formData.append("name", scrim.name);
        formData.append("date", scrim.date.toISOString());
        formData.append("map", scrim.map);
        if (scrim.notes) formData.append("notes", scrim.notes);

        try {
            const res = await axiosInstance.post(
                `/sessions/${sessionId}/scrims`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // update scrim in state
            set((state) => ({
                practiceSessions: state.practiceSessions.map((session) =>
                    session._id === sessionId
                        ? { ...session, scrims: [res.data, ...session.scrims] }
                        : session
                ),
                scrims: [res.data, ...state.scrims],
            }));

            toast.success("Scrim added successfully");
        } catch (error: any) {
            console.log("Error adding scrim: ", error);
            toast.error("Error adding scrim");
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteScrim: async (scrimId) => {
        set({ isLoading: true, error: null });

        try {
            await axiosInstance.delete(`/scrims/${scrimId}`);

            set((state) => ({
                practiceSessions: state.practiceSessions.map((session) => ({
                    ...session,
                    scrims: session.scrims.filter(
                        (scrim) => scrim._id !== scrimId
                    ),
                })),
                scrims: state.scrims.filter((scrim) => scrim._id !== scrimId),
            }));

            toast.success("Scrim deleted successfully");
        } catch (error: any) {
            console.log("Error deleting scrim: ", error);
            toast.error("Error deleting scrim");
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
