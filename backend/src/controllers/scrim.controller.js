import cloudinary from "../config/cloudinary.js";
import Scrim from "../models/scrim.model.js";
import Session from "../models/session.model.js";
import User from "../models/user.model.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
};

export const createScrim = async (req, res) => {
    try {
        // check if user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { sessionId } = req.params;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (!session.userId.equals(user._id)) {
            return res.status(403).json({
                message: "Only the owner of the session may create a scrim",
            });
        }

        const { name, map, goals, notes } = req.body;

        // check that all required fields are provided
        if (!name)
            return res.status(400).json({ message: "Scrim name is required" });

        // create and save scrim to db
        const newScrim = new Scrim({
            session: sessionId,
            name,
            map,
            goals,
            notes,
            screenshots: [],
            videos: [],
        });

        await newScrim.save();

        // save scrim under practice session
        const practiceSession = await Session.findById(sessionId);

        if (!practiceSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        practiceSession.scrims.push(newScrim._id);

        await practiceSession.save();

        res.status(200).json(newScrim);
    } catch (error) {
        console.log("Error creating scrim: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getScrim = async (req, res) => {
    try {
        // check if user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { scrimId } = req.params;

        if (!scrimId)
            return res.status(400).json({ message: "Scrim ID not provided" });

        const scrim = await Scrim.findById(scrimId);

        if (!scrim) return res.status(404).json({ message: "Scrim not found" });

        res.status(200).json(scrim);
    } catch (error) {
        console.log("Error getting scrim: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateScrim = async (req, res) => {
    try {
        // check user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { scrimId } = req.params;

        if (!scrimId)
            return res.status(400).json({ message: "Scrim ID not provided" });

        const {
            name,
            map,
            goals,
            notes,
            yourComp,
            opponentComp,
            yourScore,
            opponentScore,
            videos,
        } = req.body;

        const screenshots = req.files?.screenshots;

        const scrim = await Scrim.findById(scrimId);

        if (!scrim) return res.status(404).json({ message: "Scrim not found" });

        const session = await Session.findById(scrim.sessionId);

        if (!session.userId.equals(user._id))
            return res.status(403).json({
                message: "Only the owner of the practice session can edit it",
            });

        // upload screenshots to cloudinary and update scrim in db
        if (screenshots) {
            const screenshotUrls = await Promise.all(
                screenshots.map((screenshot) => uploadToCloudinary(screenshot))
            );

            scrim.screenshots.push(...screenshotUrls);
        }

        // update scrim data
        scrim.name = name || scrim.name;
        scrim.map = map || scrim.map;
        scrim.goals = goals || scrim.goals;
        scrim.notes = notes || scrim.notes;
        scrim.yourComp = yourComp || scrim.yourComp;
        scrim.opponentComp = opponentComp || scrim.opponentComp;
        scrim.yourScore = yourScore || scrim.yourScore;
        scrim.opponentScore = opponentScore || scrim.opponentScore;
        scrim.videos = videos || scrim.videos;

        await scrim.save();

        res.status(200).json(scrim);
    } catch (error) {
        console.log("Error updating scrim: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const deleteScrim = async (req, res) => {
    try {
        // check user is authenticated
        const clerkId = req.auth.userId;

        if (!clerkId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOne({ clerkId });

        const { scrimId } = req.params;

        if (!scrimId)
            return res.status(400).json({ message: "Scrim ID not provided" });

        const scrim = await Scrim.findById(scrimId);

        if (!scrim) return res.status(404).json({ message: "Scrim not found" });

        const session = await Session.findById(scrim.sessionId);

        if (!session.userId.equals(user._id))
            return res.status(403).json({
                message: "Only the owner can modify the practice session",
            });

        // delete scrim in db if user owns it
        await Scrim.findByIdAndDelete(scrimId);

        res.status(200).json({ message: "Scrim deleted successfully" });
    } catch (error) {
        console.log("Error deleting scrim: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
