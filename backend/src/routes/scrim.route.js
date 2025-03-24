import express from "express";
import {
    deleteScrim,
    getScrimById,
    updateScrim,
} from "../controllers/scrim.controller.js";

const router = express.Router();

router.get("/:scrimId", getScrimById);
router.patch("/:scrimId", updateScrim);
router.delete("/:scrimId", deleteScrim);

export default router;
