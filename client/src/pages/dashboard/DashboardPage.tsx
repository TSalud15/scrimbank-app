import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SessionCard from "./components/SessionCard";

const DashboardPage = () => {
    return (
        <main className="flex flex-1 flex-col overflow-auto p-4 gap-5">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-lg md:text-2xl">
                    My Practice Sessions
                </span>
                <div>
                    <Button className="rounded-full bg-red-400 hover:bg-red-300">
                        <Plus size={16} color="#262626" />
                        New Session
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-auto gap-4">
                <SessionCard
                    name="Practice Session"
                    date={new Date()}
                    isLoading={false}
                />
                <div className="flex justify-center items-center rounded-xl bg-transparent border-2 border-dashed h-20 w-full hover:bg-secondary hover:cursor-pointer">
                    <span>Create new session</span>
                </div>
            </div>
        </main>
    );
};
export default DashboardPage;
