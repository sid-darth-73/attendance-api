import express from 'express';
import { getAttendance, updateAttendance, addCourse } from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/', getAttendance);
router.post('/add', addCourse);
router.patch('/update', updateAttendance);

export default router;