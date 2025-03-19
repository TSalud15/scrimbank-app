import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SessionCard from "./components/SessionCard";
import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";

const DashboardPage = () => {
    const { practiceSessions, fetchPracticeSessions, isLoading } =
        useSessionStore();

    useEffect(() => {
        fetchPracticeSessions();
    }, [fetchPracticeSessions]);

    return (
        <main className="flex flex-1 flex-col overflow-auto p-6 gap-5">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">My Practice Sessions</h1>
                <div>
                    <Button className="rounded-full bg-red-400 hover:bg-red-300">
                        <Plus size={16} />
                        New Session
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <div>Practice Sessions skeleton</div>
                ) : (
                    practiceSessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            name={session.name}
                            date={new Date(session.date)}
                        />
                    ))
                )}
                <Button
                    variant="secondary"
                    className="flex justify-center items-center h-10 rounded-xl bg-transparent border-2 border-dashed hover:bg-secondary"
                >
                    Create new session
                </Button>
            </div>
        </main>
    );
};
export default DashboardPage;
