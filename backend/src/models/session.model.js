import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        goals: [String],
        scrims: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Scrim",
            },
        ],
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
