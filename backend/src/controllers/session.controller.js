import Session from "../models/session.model.js";
import User from "../models/user.model.js";

export const createPracticeSession = async (req, res) => {
    try {
        // check if user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, date } = req.body;

        // check that all required fields are provided
        if (!name || !date) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }

        // create and save practice session to db
        const newPracticeSession = new Session({
            userId: user._id,
            name,
            date,
        });

        await newPracticeSession.save();

        res.status(201).json(newPracticeSession);
    } catch (error) {
        console.log("Error creating practice session: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getPracticeSession = async (req, res) => {
    try {
        // check if user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ message: "Session ID not provided" });
        }

        // get practice session from db
        const practiceSession = await Session.findById(sessionId);

        if (!practiceSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json(practiceSession);
    } catch (error) {
        console.log("Error getting practice session: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getPracticeSessions = async (req, res) => {
    try {
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        // get practice sessions from db that belong to user in descending order (newest first)
        const practiceSessions = await Session.find({ userId: user._id }).sort({
            createdAt: -1,
        });

        res.status(200).json(practiceSessions);
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Server error: Error getting practice sessions" });
    }
};

export const updatePracticeSession = async (req, res) => {
    try {
        // check user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { sessionId } = req.params;

        const { name, date } = req.body;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (!session.userId.equals(user._id)) {
            return res
                .status(403)
                .json({ message: "You do not own this session" });
        }

        // update session data
        session.name = name || session.name;
        session.date = date || session.date;

        await session.save();

        res.status(200).json(session);
    } catch (error) {
        console.log("Error updating practice session: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const deletePracticeSession = async (req, res) => {
    try {
        // check user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { sessionId } = req.params;

        // check that session id is provided
        if (!sessionId) {
            return res.status(400).json({ message: "Session ID is required" });
        }

        const session = await Session.findById(sessionId);

        if (!session.userId.equals(user._id))
            return res
                .status(403)
                .json({ message: "You do not own this practice session" });

        // delete practice session in db if user owns it
        await Session.findByIdAndDelete(sessionId);

        return res.status(200).json({
            message: "Practice session deleted successfully",
        });
    } catch (error) {
        console.log("Error deleting practice session: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
