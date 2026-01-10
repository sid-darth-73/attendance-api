import express from 'express';
import { getAttendance, updateAttendance, addCourse } from '../controllers/attendanceController.js';
import { verifySecret } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAttendance);
router.post('/add', verifySecret, addCourse);
router.patch('/update', verifySecret, updateAttendance);

export default router;