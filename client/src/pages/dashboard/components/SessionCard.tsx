import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSessionStore } from "@/stores/useSessionStore";
import { PracticeSession } from "@/types";
import { Pencil } from "lucide-react";
import EditSessionDialog from "./EditSessionDialog";
import { Link } from "react-router-dom";
import DeleteSessionDialog from "./DeleteSessionDialog";

type SessionCardProps = {
    session: PracticeSession;
};

const SessionCard = ({ session }: SessionCardProps) => {
    const { deletePracticeSession } = useSessionStore();

    return (
        <Card>
            <Link to={`/session/${session._id}`}>
                <CardHeader>
                    <CardTitle className="text-xl">{session.name}</CardTitle>
                    <CardDescription>
                        {new Date(session.date).toLocaleDateString()}
                    </CardDescription>
                </CardHeader>
            </Link>
            <CardFooter>
                <div className="flex gap-2">
                    <EditSessionDialog
                        sessionId={session._id}
                        initialName={session.name}
                        initialDate={new Date(session.date)}
                        icon={<Pencil />}
                        triggerText="Edit"
                    />
                    <DeleteSessionDialog
                        deletePracticeSession={deletePracticeSession}
                        sessionId={session._id}
                    />
                </div>
            </CardFooter>
        </Card>
    );
};
export default SessionCard;
