import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ScrimPage = () => {
    const { scrimId } = useParams();

    const { currentScrim, fetchScrimById, isLoading } = useSessionStore();

    useEffect(() => {
        if (scrimId) fetchScrimById(scrimId);
    }, [scrimId, fetchScrimById]);

    if (isLoading) return <div>Loading scrim...</div>;

    return (
        <main className="h-full flex flex-col overflow-auto p-6 space-y-2">
            <div className="flex flex-col justify-center items-center space-y-1">
                <h1 className="font-semibold text-2xl">{currentScrim?.name}</h1>
                <h2>
                    {currentScrim
                        ? new Date(currentScrim.date).toLocaleDateString()
                        : ""}
                </h2>
            </div>

            <div className="flex justify-center items-center space-x-2">
                {/* TODO: Score selector */}
                <h2 className="font-medium">Score: </h2>
                <h2>13:11</h2>
            </div>

            <div className="flex flex-col justify-start space-y-2">
                <h2 className="font-medium">Map</h2>
                {/* TODO: Map selector */}
                <div className="w-full h-16 bg-gray-900 rounded-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TODO: Comp selector */}
                <div className="flex flex-col space-y-2">
                    <h2 className="font-medium">Comp</h2>
                    <div className="w-full h-24 bg-gray-900 rounded-lg"></div>
                </div>

                <div className="flex flex-col space-y-2">
                    <h2 className="font-medium">Opponent Comp</h2>
                    <div className="w-full h-24 bg-gray-900 rounded-lg"></div>
                </div>
            </div>

            <div className="flex flex-col justify-start space-y-2">
                <h2 className="font-medium">Notes</h2>
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
