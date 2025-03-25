import mongoose from "mongoose";

const MAP_POOL = [
    "ascent",
    "icebox",
    "haven",
    "fracture",
    "lotus",
    "pearl",
    "split",
    "bind",
    "breeze",
    "sunset",
    "abyss",
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
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
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
        },
        videos: {
            type: [String],
        },
    },
    { timestamps: true }
);

const Scrim = mongoose.model("Scrim", scrimSchema);

export default Scrim;
