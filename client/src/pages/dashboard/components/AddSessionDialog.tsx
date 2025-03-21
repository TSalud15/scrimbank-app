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
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AddSessionDialog = () => {
    const { addPracticeSession } = useSessionStore();

    const [isLoading, setIsLoading] = useState(false);
    const [sessionDialogOpen, setSessionDialogOpen] = useState(false);

    // Form inputs
    const [name, setName] = useState<string>("New session");
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

            toast.success("New session was created");
        } catch (error: any) {
            toast.error("Error creating session");
            console.log("Error creating session: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-red-400 hover:bg-red-300">
                    <Plus size={16} />
                    New Session
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Practice Session</DialogTitle>
                    <DialogDescription>
                        Add a new practice session to your sessions list
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
                            defaultValue="New session"
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
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        Add session
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddSessionDialog;
