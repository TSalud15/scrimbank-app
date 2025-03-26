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
import { Trash2 } from "lucide-react";

interface DeleteScrimDialogProps {
    deleteScrim: (id: string) => void;
    scrimId: string;
}
const DeleteScrimDialog = ({
    deleteScrim,
    scrimId,
}: DeleteScrimDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                    <Trash2 className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the scrim from this practice session and remove
                        all scrim data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({
                            variant: "destructive",
                        })}
                        onClick={() => deleteScrim(scrimId)}
                    >
                        Yes, delete this scrim
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default DeleteScrimDialog;
