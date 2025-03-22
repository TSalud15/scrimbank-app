import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/stores/useSessionStore";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DEFAULT_SESSION_NAME = "New session";

interface AddSessionDialogProps {
    triggerClassName?: string;
    icon?: React.ReactNode;
    triggerText?: string;
}

const AddSessionDialog = ({
    triggerClassName,
    icon,
    triggerText,
}: AddSessionDialogProps) => {
    const { addPracticeSession } = useSessionStore();

    const [isLoading, setIsLoading] = useState(false);
    const [sessionDialogOpen, setSessionDialogOpen] = useState(false);

    // Form inputs
    const [name, setName] = useState<string>(DEFAULT_SESSION_NAME);
    const [date, setDate] = useState<Date>();

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!name || !date) {
                return toast.error("Please fill in all fields");
            }

            const newSession = {
                name,
                date,
            };

            addPracticeSession(newSession);

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
                    <DialogTitle>Add practice session</DialogTitle>
                    <DialogDescription>
                        Add practice session to your sessions list
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
                            defaultValue={DEFAULT_SESSION_NAME}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        {/* Date picker */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "col-span-3 justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setSessionDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !date || !name}
                    >
                        Add session
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddSessionDialog;
