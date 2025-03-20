import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import SessionGrid from "./components/SessionGrid";
import toast from "react-hot-toast";

const DashboardPage = () => {
    const { practiceSessions, fetchPracticeSessions, isLoading } =
        useSessionStore();

    useEffect(() => {
        fetchPracticeSessions();
    }, [fetchPracticeSessions]);

    return (
        <main className="flex flex-1 flex-col overflow-auto p-6 space-y-5">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">My Practice Sessions</h1>
                <div>
                    <Button
                        className="rounded-full bg-red-400 hover:bg-red-300"
                        onClick={() => toast.success("New session created!")}
                    >
                        <Plus size={16} />
                        New Session
                    </Button>
                </div>
            </div>
            <SessionGrid
                practiceSessions={practiceSessions}
                isLoading={isLoading}
            />
        </main>
    );
};
export default DashboardPage;
