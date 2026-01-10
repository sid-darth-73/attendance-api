import express from "express";
import { addExtra } from "../controllers/extraController.js";
import { verifySecret } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /extra
 * Body: { courseName, date, secret }
 */
router.post("/", verifySecret, addExtra);

export default router;

