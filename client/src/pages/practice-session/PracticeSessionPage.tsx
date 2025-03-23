import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/stores/useSessionStore";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrimsTable from "./components/ScrimsTable";

const PracticeSessionPage = () => {
    const { sessionId } = useParams();

    const { currentSession, fetchPracticeSessionById, isLoading } =
        useSessionStore();

    useEffect(() => {
        if (sessionId) fetchPracticeSessionById(sessionId);
    }, [fetchPracticeSessionById, sessionId]);

    if (isLoading) return <div>Loading Practice Session...</div>;

    return (
        <main className="h-full flex flex-col overflow-auto p-6 space-y-5">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">
                    {currentSession?.name}
                </h1>
                <Button className="rounded-full bg-red-400 hover:bg-red-300">
                    <Plus size={16} />
                    New scrim
                </Button>
            </div>
            <ScrimsTable />
        </main>
    );
};
export default PracticeSessionPage;
