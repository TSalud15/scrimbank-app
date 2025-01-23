import express from "express";

import { requireAuth } from "@clerk/express";

import {
    createPracticeSession,
    deletePracticeSession,
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", requireAuth(), createPracticeSession);
router.delete("/:sessionId", requireAuth(), deletePracticeSession);

export default router;
