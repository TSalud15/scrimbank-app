import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SessionCard from "./components/SessionCard";

const DashboardPage = () => {
    return (
        <main className="flex flex-1 flex-col overflow-auto p-4 gap-5">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">My Practice Sessions</h1>
                <div>
                    <Button className="rounded-full bg-red-400 hover:bg-red-300">
                        <Plus size={16} />
                        New Session
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SessionCard name="Practice Session" date={new Date()} />
                <SessionCard name="Practice Session 2" date={new Date()} />
                <SessionCard name="Practice Session 3" date={new Date()} />
                <SessionCard name="Practice Session 4" date={new Date()} />
            </div>
        </main>
    );
};
export default DashboardPage;
