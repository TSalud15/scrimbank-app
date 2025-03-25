import { Dispatch, SetStateAction } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const MAP_POOL = [
    "ascent",
    "icebox",
    "haven",
    "fracture",
    "lotus",
    "pearl",
    "split",
    "bind",
    "breeze",
    "sunset",
    "abyss",
];

interface MapSelectorProps {
    setMap: Dispatch<SetStateAction<string>>;
}

const MapSelector = ({ setMap }: MapSelectorProps) => {
    return (
        <Select onValueChange={setMap}>
            <SelectTrigger id="map" className="col-span-3">
                <SelectValue placeholder="Select scrim map" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Maps</SelectLabel>
                    {MAP_POOL.map((map) => (
                        <SelectItem key={map} value={map}>
                            {map.charAt(0).toUpperCase() + map.slice(1)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
export default MapSelector;
