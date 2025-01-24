import { User } from "../models/user.model.js";
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
            ownerId: userId,
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
            .json({ message: "Server error: Error creating practice session" });
    }
};

export const getPracticeSession = async (req, res) => {
    try {
        // check if user is authenticated
        const userId = req.auth.clerkId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { sessionId } = req.params;

        // get practice session from db
        const practiceSession = await Session.findOne({
            _id: sessionId,
            ownerId: userId,
        });

        if (!practiceSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        return res.status(200).json(practiceSession);
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Server error: Error getting practice session" });
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

        // delete practice session in db
        const deletedSession = await Session.findOneAndDelete({
            _id: sessionId,
            ownerId: userId,
        });

        // check if session was deleted
        if (!deletedSession) {
            return res
                .status(403)
                .json({ message: "You do not own this session" });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Server error: Error deleting practice session" });
    }
};
