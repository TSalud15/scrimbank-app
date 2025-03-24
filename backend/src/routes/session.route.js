import express from "express";

import {
    createPracticeSession,
    getPracticeSessionById,
    deletePracticeSession,
    getPracticeSessions,
    updatePracticeSession,
} from "../controllers/session.controller.js";
import { createScrim } from "../controllers/scrim.controller.js";

const router = express.Router();

router.post("/", createPracticeSession);
router.post("/:sessionId/scrims", createScrim);
router.get("/:sessionId", getPracticeSessionById);
router.get("/", getPracticeSessions);
router.patch("/:sessionId", updatePracticeSession);
router.delete("/:sessionId", deletePracticeSession);

export default router;
