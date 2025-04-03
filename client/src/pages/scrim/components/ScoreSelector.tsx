import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

const MAX_SCORE = 25;

interface ScoreSelectorProps {
    initialScore: string;
    setScore: Dispatch<SetStateAction<string>>;
}

const ScoreSelector = ({ initialScore, setScore }: ScoreSelectorProps) => {
    return (
        <Select onValueChange={setScore} defaultValue={initialScore}>
            <SelectTrigger id="yourScore" className="flex w-[60px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Score</SelectLabel>
                    {Array.from({ length: MAX_SCORE }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                            {i === 0 ? "0" : i}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
export default ScoreSelector;
