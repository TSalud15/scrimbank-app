import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSessionStore } from "@/stores/useSessionStore";
import { PracticeSession } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import SessionDialog from "./SessionDialog";

type SessionCardProps = {
    session: PracticeSession;
};

const SessionCard = ({ session }: SessionCardProps) => {
    const { addPracticeSession, deletePracticeSession } = useSessionStore();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{session.name}</CardTitle>
                <CardDescription>
                    {new Date(session.date).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex gap-2">
                    <SessionDialog
                        initialName={session.name}
                        initialDate={session.date}
                        icon={<Pencil />}
                        triggerText="Edit"
                        title="Edit practice session"
                        description="Edit current practice session"
                        submitText="Save changes"
                        action={addPracticeSession}
                    />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the practice session and
                                    remove any scrims under this session from
                                    our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className={buttonVariants({
                                        variant: "destructive",
                                    })}
                                    onClick={() =>
                                        deletePracticeSession(session._id)
                                    }
                                >
                                    Yes, delete this session
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardFooter>
        </Card>
    );
};
export default SessionCard;
