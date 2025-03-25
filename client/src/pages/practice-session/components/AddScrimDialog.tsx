import DatePicker from "@/components/DatePicker";
import MapSelector from "@/components/MapSelector";
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
import { Textarea } from "@/components/ui/textarea";
import { useSessionStore } from "@/stores/useSessionStore";
import { useState } from "react";
import toast from "react-hot-toast";

const DEFAULT_SCRIM_NAME = "New scrim";

interface AddSessionDialogProps {
    sessionId: string;
    triggerClassName?: string;
    icon?: React.ReactNode;
    triggerText?: string;
}

const AddScrimDialog = ({
    sessionId,
    triggerClassName,
    icon,
    triggerText,
}: AddSessionDialogProps) => {
    const { addScrim } = useSessionStore();

    const [isLoading, setIsLoading] = useState(false);
    const [sessionDialogOpen, setSessionDialogOpen] = useState(false);

    // Form inputs
    const [name, setName] = useState<string>(DEFAULT_SCRIM_NAME);
    const [map, setMap] = useState<string>("");
    const [date, setDate] = useState<Date>();
    const [notes, setNotes] = useState<string>("");

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!name || !date) {
                return toast.error("Please fill in all fields");
            }

            const newScrim = {
                name,
                date,
                map,
                notes,
            };

            addScrim(sessionId, newScrim);

            // reset form
            setName("");
            setDate(undefined);
            setSessionDialogOpen(false);
        } catch (error: any) {
            console.log("Error creating session: ", error);
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
                    <DialogTitle>Add scrim</DialogTitle>
                    <DialogDescription>
                        Add scrim to this practice session
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
                            defaultValue={DEFAULT_SCRIM_NAME}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="map" className="text-right">
                            Map
                        </Label>
                        <MapSelector setMap={setMap} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        {/* Date picker */}
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            onChange={(e) => setNotes(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter className="space-y-reverse space-y-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !date || !name || !map}
                    >
                        Add scrim
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddScrimDialog;
