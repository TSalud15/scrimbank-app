import { Button } from "@/components/ui/button";
import SessionCard from "./SessionCard";
import SessionGridSkeleton from "./SessionGridSkeleton";

type SessionGridProps = {
    practiceSessions: any[];
    isLoading: boolean;
};

const SessionGrid = ({ practiceSessions, isLoading }: SessionGridProps) => {
    if (isLoading) return <SessionGridSkeleton />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceSessions.map((session) => (
                <SessionCard
                    key={session._id}
                    name={session.name}
                    date={new Date(session.date)}
                />
            ))}

            <Button
                variant="secondary"
                className="flex justify-center items-center h-10 rounded-xl bg-transparent border-2 border-dashed hover:bg-secondary"
            >
                Create new session
            </Button>
        </div>
    );
};
export default SessionGrid;
