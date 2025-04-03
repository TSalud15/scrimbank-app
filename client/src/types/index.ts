export interface PracticeSession {
    _id: string;
    name: string;
    date: Date;
    scrims: Scrim[];
    createdAt: string;
    updatedAt: string;
}

export interface Scrim {
    _id: string;
    sessionId: string;
    name: string;
    map: string;
    date: Date;
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
    yourScore: number;
    opponentScore: number;
    screenshots: string[];
    videos: string[];
    createdAt: string;
    updatedAt: string;
}
