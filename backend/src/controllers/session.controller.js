import { Session } from "../models/session.model.js";
export const createPracticeSession = async (req, res) => {
    try {
        // check if user is authenticated
        const userId = req.auth.clerkId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { name, date, goals } = req.body;

        // check that all required fields are provided
        if (!name || !date || !goals) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }

        // create and save practice session to db
        const newPracticeSession = new Session({
            userId,
            name,
            date,
            goals,
            scrims: [],
        });

        await newPracticeSession.save();

        return res.status(201).json(newPracticeSession);
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Error creating practice session" });
    }
};

export const deletePracticeSession = async (req, res) => {
    try {
        // check user is authenticated
        const userId = req.auth.clerkId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { sessionId } = req.params;

        // check that session id is provided
        if (!sessionId) {
            return res.status(400).json({ message: "Session ID is required" });
        }

        // TODO: delete scrims in session logic

        await Session.findByIdAndDelete(sessionId); // delete practice session in db
    } catch (error) {}
};
