import express from "express";
import {
    createScrim,
    deleteScrim,
    getScrim,
    updateScrim,
} from "../controllers/scrim.controller.js";

const router = express.Router();

router.post("/", createScrim);
router.get("/:scrimId", getScrim);
router.patch("/:scrimId", updateScrim);
router.delete("/:scrimId", deleteScrim);

export default router;
