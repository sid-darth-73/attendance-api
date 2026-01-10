import express from "express";
import { markCancelled } from "../controllers/cancelController.js";
import { verifySecret } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /cancel
 * Body: { courseName, date, secret }
 */
router.post("/", verifySecret, markCancelled);

export default router;

