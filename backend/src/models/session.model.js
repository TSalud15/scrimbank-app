import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
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
        date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
