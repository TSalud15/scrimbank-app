import mongoose from "mongoose";

const scrimSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        map: {
            type: String,
            enum: [
                "Abyss",
                "Bind",
                "Haven",
                "Fracture",
                "Lotus",
                "Pearl",
                "Split",
            ], // potentially add rest of maps
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
    },
    { timestamps: true }
);

const Scrim = mongoose.model("Scrim", scrimSchema);

export default Scrim;
