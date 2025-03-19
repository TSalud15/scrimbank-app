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
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

type SessionCardProps = {
    name: string;
    date: Date;
};

const SessionCard = ({ name, date }: SessionCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{name}</CardTitle>
                <CardDescription>{date.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex gap-2">
                    <Button>
                        <Pencil />
                        Edit
                    </Button>
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
                                <AlertDialogAction>
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
