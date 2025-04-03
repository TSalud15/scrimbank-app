import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScoreSection from "./components/ScoreSection";
import { UsersRound, Map, NotebookPen } from "lucide-react";

const INITIAL_SCORE = "0";

const ScrimPage = () => {
    const { scrimId } = useParams();

    const { currentScrim, fetchScrimById, isLoading } = useSessionStore();

    const [yourScore, setYourScore] = useState(INITIAL_SCORE);
    const [opponentScore, setOpponentScore] = useState(INITIAL_SCORE);

    useEffect(() => {
        if (scrimId) fetchScrimById(scrimId);
    }, [scrimId, fetchScrimById]);

    if (isLoading) return <div>Loading scrim...</div>;

    return (
        <main className="h-full flex flex-col overflow-auto p-6 space-y-3">
            <div className="flex flex-col justify-center items-center space-y-1">
                <h1 className="font-semibold text-3xl">{currentScrim?.name}</h1>
                <h2 className="text-lg">
                    {currentScrim
                        ? new Date(currentScrim.date).toLocaleDateString(
                              undefined,
                              {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              }
                          )
                        : ""}
                </h2>
            </div>

            <ScoreSection
                initialYourScore={
                    currentScrim?.yourScore.toString() || INITIAL_SCORE
                }
                initialOpponentScore={
                    currentScrim?.opponentScore.toString() || INITIAL_SCORE
                }
                setYourScore={setYourScore}
                setOpponentScore={setOpponentScore}
            />

            <div className="flex flex-col justify-start space-y-2">
                <div className="flex items-center space-x-1">
                    <Map size={20} />
                    <h2 className="font-medium">Map</h2>
                </div>
                {/* TODO: Map selector */}
                <div className="w-full h-16 bg-gray-900 rounded-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TODO: Comp selector */}
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-1">
                        <UsersRound size={20} />
                        <h2 className="font-medium">Your Comp</h2>
                    </div>
                    <div className="w-full h-24 bg-gray-900 rounded-lg"></div>
                </div>

                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-1">
                        <UsersRound size={20} />
                        <h2 className="font-medium">Opponent Comp</h2>
                    </div>

                    <div className="w-full h-24 bg-gray-900 rounded-lg"></div>
                </div>
            </div>

            <div className="flex flex-col justify-start space-y-2">
                <div className="flex items-center space-x-1">
                    <NotebookPen size={20} />
                    <h2 className="font-medium">Notes</h2>
                </div>
                <div className="w-full h-36 bg-gray-900 rounded-lg"></div>
            </div>

            <p>
                VOD Link:{" "}
                <a
                    className="underline"
                    href="https://www.youtube.com/watch?v=bZXHNcyTyjs"
                >
                    https://www.youtube.com/watch?v=bZXHNcyTyjs
                </a>
            </p>
        </main>
    );
};
export default ScrimPage;
