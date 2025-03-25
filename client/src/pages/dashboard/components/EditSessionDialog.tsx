import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSessionStore } from "@/stores/useSessionStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface EditSessionDialogProps {
    sessionId: string;
    initialName: string;
    initialDate: Date;
    triggerClassName?: string;
    icon?: React.ReactNode;
    triggerText?: string;
}

const EditSessionDialog = ({
    sessionId,
    initialName,
    initialDate,
    triggerClassName,
    icon,
    triggerText,
}: EditSessionDialogProps) => {
    const { updatePracticeSession } = useSessionStore();

    const [isLoading, setIsLoading] = useState(false);
    const [sessionDialogOpen, setSessionDialogOpen] = useState(false);

    // Form inputs
    const [name, setName] = useState<string>(initialName);
    const [date, setDate] = useState<Date | undefined>(initialDate);

    const handleCancel = () => {
        setName(initialName);
        setDate(initialDate);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!name || !date) {
                return toast.error("Please fill in all fields");
            }

            const updatedSession = {
                name,
                date,
            };

            updatePracticeSession(sessionId, updatedSession);

            setSessionDialogOpen(false);
        } catch (error: any) {
            toast.error("Error saving session changes");
            console.log("Error updating session: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
            <DialogTrigger asChild>
                <Button className={triggerClassName}>
                    {icon}
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Practice Session</DialogTitle>
                    <DialogDescription>
                        Make changes to your practice session
                    </DialogDescription>
                </DialogHeader>
                {/* Form inputs */}
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue={initialName}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        {/* Date picker */}
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                </div>
                <DialogFooter className="space-y-reverse space-y-2">
                    <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            isLoading ||
                            !date ||
                            !name ||
                            (name === initialName &&
                                date?.toLocaleDateString() ===
                                    initialDate.toLocaleDateString())
                        }
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default EditSessionDialog;
