import express from "express";
import { markCancelled } from "../controllers/cancelController.js";

const router = express.Router();

/**
 * Example:
 * GET /cancel/Maths/2026-01-10
 */
router.get("/:courseName/:date", markCancelled);

export default router;

