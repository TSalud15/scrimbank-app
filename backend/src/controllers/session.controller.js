import Session from "../models/session.model.js";
import User from "../models/user.model.js";

export const createPracticeSession = async (req, res) => {
    try {
        // check if user is authenticated
        const clerkId = req.auth.clerkId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { name, date, goals } = req.body;

        // check that all required fields are provided
        if (!name || !date || !goals) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }

        // create and save practice session to db
        const newPracticeSession = new Session({
            user,
            name,
            date,
            goals,
            scrims: [],
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
        const userId = req.auth.clerkId;

        if (!userId) {
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
        const clerkId = req.auth.clerkId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        // get practice sessions from db
        const practiceSessions = await Session.find({ user: user._id });

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
        const clerkId = req.auth.clerkId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { sessionId } = req.params;

        const { name, date, goals, scrims } = req.body;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (!session.user.equals(user._id)) {
            return res
                .status(403)
                .json({ message: "You do not own this session" });
        }

        // update session data
        session.name = name || session.name;
        session.date = date || session.date;
        session.goals = goals || session.goals;
        session.scrims = scrims || session.scrims;

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
        const clerkId = req.auth.clerkId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { sessionId } = req.params;

        // check that session id is provided
        if (!sessionId) {
            return res.status(400).json({ message: "Session ID is required" });
        }

        // TODO: delete scrims in session logic

        // delete practice session in db if user owns it
        const deletedSession = await Session.findOneAndDelete({
            _id: sessionId,
            user: user._id,
        });

        // check if session was deleted
        if (!deletedSession) {
            res.status(403).json({ message: "You do not own this session" });
        }

        return res.status(200).json(deletedSession);
    } catch (error) {
        console.log("Error deleting practice session: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
