import SessionCard from "./SessionCard";
import SessionGridSkeleton from "./SessionGridSkeleton";
import { PracticeSession } from "@/types";
import SessionDialog from "./SessionDialog";
import { useSessionStore } from "@/stores/useSessionStore";

type SessionGridProps = {
    practiceSessions: PracticeSession[];
    isLoading: boolean;
};

const SessionGrid = ({ practiceSessions, isLoading }: SessionGridProps) => {
    const { addPracticeSession } = useSessionStore();
    if (isLoading) return <SessionGridSkeleton />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceSessions.map((session) => (
                <SessionCard key={session._id} session={session} />
            ))}

            <SessionDialog
                triggerText="Create new session"
                triggerClassName="flex justify-center items-center h-10 rounded-xl bg-transparent border-2 border-dashed hover:bg-secondary text-white"
                title="Add practice session"
                description="Add a new practice session to your sessions list"
                submitText="Add session"
                action={addPracticeSession}
            />
        </div>
    );
};
export default SessionGrid;
