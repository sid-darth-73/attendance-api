import express from "express";
import { markAbsent } from "../controllers/absentController.js";

const router = express.Router();

/**
 * Example:
 * GET /absent/Maths/2026-01-10
 */
router.get("/:courseName/:date", markAbsent);

export default router;
