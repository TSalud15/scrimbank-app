import express from "express";

import { requireAuth } from "@clerk/express";

import {
    createPracticeSession,
    getPracticeSession,
    deletePracticeSession,
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", requireAuth(), createPracticeSession);
router.get("/:sessionId", requireAuth(), getPracticeSession);
router.delete("/:sessionId", requireAuth(), deletePracticeSession);

export default router;
