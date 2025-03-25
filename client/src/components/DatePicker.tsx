import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface DatePickerProps {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger id="date" asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
    );
};
export default DatePicker;
