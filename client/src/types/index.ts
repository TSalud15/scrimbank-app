export interface PracticeSession {
    _id: string;
    name: string;
    date: Date;
}

export interface Scrim {
    _id: string;
    sessionId: string;
    name: string;
    map: string;
    goals: string[];
    notes: string;
    yourComp: [
        {
            player: string;
            agent: string;
        }
    ];
    opponentComp: [
        {
            player: string;
            agent: string;
        }
    ];
    playerScore: number;
    opponentScore: number;
    screenshots: string[];
    videos: string[];
}
