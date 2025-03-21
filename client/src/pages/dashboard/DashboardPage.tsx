import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import SessionGrid from "./components/SessionGrid";
import SessionDialog from "./components/SessionDialog";
import { Plus } from "lucide-react";

const DashboardPage = () => {
    const {
        practiceSessions,
        fetchPracticeSessions,
        addPracticeSession,
        isLoading,
    } = useSessionStore();

    useEffect(() => {
        fetchPracticeSessions();
    }, [fetchPracticeSessions]);

    return (
        <main className="flex flex-1 flex-col overflow-auto p-6 space-y-5">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">My Practice Sessions</h1>
                <SessionDialog
                    initialName="New session"
                    icon={<Plus />}
                    triggerText="Add session"
                    triggerClassName="rounded-full bg-red-400 hover:bg-red-300"
                    title="Add practice session"
                    description="Add a new practice session to your sessions list"
                    submitText="Add session"
                    action={addPracticeSession}
                />
            </div>
            <SessionGrid
                practiceSessions={practiceSessions}
                isLoading={isLoading}
            />
        </main>
    );
};
export default DashboardPage;
