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
import { useSessionStore } from "@/stores/useSessionStore";
import { Scrim } from "@/types";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteScrimDialog from "./DeleteScrimDialog";

interface ScrimsTableProps {
    scrims: Scrim[];
}

const ScrimsTable = ({ scrims }: ScrimsTableProps) => {
    const { deleteScrim } = useSessionStore();

    return (
        <Table>
            <TableCaption>
                {scrims.length === 0
                    ? "No scrims (yet)."
                    : "A list of your scrims."}
            </TableCaption>
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
                    <TableRow key={scrim._id}>
                        <TableCell className="font-medium">
                            {scrim.name}
                        </TableCell>
                        <TableCell>
                            {scrim.map.charAt(0).toUpperCase() +
                                scrim.map.slice(1)}
                        </TableCell>

                        <TableCell>
                            {new Date(scrim.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-1 justify-center">
                                <Button variant={"ghost"} size={"sm"} asChild>
                                    <Link to={`/scrim/${scrim._id}`}>
                                        <ExternalLink className="size-4" />
                                    </Link>
                                </Button>
                                <DeleteScrimDialog
                                    deleteScrim={deleteScrim}
                                    scrimId={scrim._id}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export default ScrimsTable;
