import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ExternalLink, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";

const scrims = [
    {
        id: 1,
        name: "Scrim vs. Sentinels",
        map: "Ascent",
        date: new Date().toLocaleDateString(),
    },
    {
        id: 2,
        name: "Testing Icebox comp",
        map: "Icebox",
        date: new Date().toLocaleDateString(),
    },
    {
        id: 3,
        name: "Lotus protocols",
        map: "Lotus",
        date: new Date().toLocaleDateString(),
    },
    {
        id: 4,
        name: "Scrim vs. T1",
        map: "Haven",
        date: new Date().toLocaleDateString(),
    },
    {
        id: 5,
        name: "New split comp",
        map: "Split",
        date: new Date().toLocaleDateString(),
    },
];

const ScrimsTable = () => {
    return (
        <Table>
            <TableCaption>A list of your scrims.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Scrim</TableHead>
                    <TableHead>Map</TableHead>

                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {scrims.map((scrim) => (
                    <TableRow key={scrim.id}>
                        <TableCell className="font-medium">
                            {scrim.name}
                        </TableCell>
                        <TableCell>{scrim.map}</TableCell>

                        <TableCell>{scrim.date}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-center">
                                <Button variant={"ghost"} size={"sm"}>
                                    <ExternalLink className="size-4" />
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export default ScrimsTable;
