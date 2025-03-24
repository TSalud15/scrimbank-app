import mongoose from "mongoose";

const MAP_POOL = [
    "ascent",
    "icebox",
    "haven",
    "fracture",
    "lotus",
    "pearl",
    "split",
];

const AGENT_LIST = [
    "brimstone",
    "viper",
    "omen",
    "cypher",
    "sova",
    "sage",
    "phoenix",
    "jett",
    "raze",
    "breach",
    "reyna",
    "killjoy",
    "skye",
    "yoru",
    "astra",
    "kay/o",
    "chamber",
    "neon",
    "fade",
    "harbor",
    "gekko",
    "deadlock",
    "iso",
    "clove",
    "vyse",
    "tejo",
    "waylay",
];

const scrimSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        map: {
            type: String,
            enum: MAP_POOL, // potentially add rest of maps
        },
        goals: {
            type: [String],
            default: [],
        },
        notes: {
            type: String,
            default: "",
        },
        yourComp: [
            {
                player: {
                    type: String,
                    required: true,
                },
                agent: {
                    type: String,
                    required: true,
                    enum: AGENT_LIST,
                },
            },
        ],
        opponentComp: [
            {
                player: {
                    type: String,
                    required: true,
                },
                agent: {
                    type: String,
                    required: true,
                    enum: AGENT_LIST,
                },
            },
        ],
        yourScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 24,
        },
        opponentScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 24,
        },
        screenshots: {
            type: [String],
            default: [],
        },
        videos: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Scrim = mongoose.model("Scrim", scrimSchema);

export default Scrim;
