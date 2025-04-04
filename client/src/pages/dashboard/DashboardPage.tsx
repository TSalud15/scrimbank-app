import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import SessionGrid from "./components/SessionGrid";
import AddSessionDialog from "./components/AddSessionDialog";
import { Plus } from "lucide-react";

const DashboardPage = () => {
    const { practiceSessions, fetchPracticeSessions, isLoading } =
        useSessionStore();

    useEffect(() => {
        fetchPracticeSessions();
    }, [fetchPracticeSessions]);

    return (
        <main className="h-full flex flex-col overflow-auto p-6 space-y-5">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">Practice Sessions</h1>
                <AddSessionDialog
                    triggerClassName="rounded-full bg-red-400 hover:bg-red-300"
                    triggerText="New Session"
                    icon={<Plus size={16} />}
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
