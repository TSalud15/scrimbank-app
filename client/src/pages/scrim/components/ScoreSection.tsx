import { Dispatch, SetStateAction } from "react";
import ScoreSelector from "./ScoreSelector";

interface ScoreSectionProps {
    initialYourScore: string;
    initialOpponentScore: string;
    setYourScore: Dispatch<SetStateAction<string>>;
    setOpponentScore: Dispatch<SetStateAction<string>>;
}

const ScoreSection = ({
    initialYourScore,
    initialOpponentScore,
    setYourScore,
    setOpponentScore,
}: ScoreSectionProps) => {
    return (
        <div className="flex justify-center items-center space-x-5">
            <div className="flex justify-center items-center space-x-2">
                <h2 className="font-medium text-lg">Your score: </h2>
                <ScoreSelector
                    initialScore={initialYourScore}
                    setScore={setYourScore}
                />
            </div>

            <div className="flex justify-center items-center space-x-2">
                <h2 className="font-medium text-lg">Opponent score: </h2>
                <ScoreSelector
                    initialScore={initialOpponentScore}
                    setScore={setOpponentScore}
                />
            </div>
        </div>
    );
};
export default ScoreSection;
