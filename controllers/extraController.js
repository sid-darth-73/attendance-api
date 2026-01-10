import { extraModel } from "../models/extraModel.js";
import { attendanceModel } from "../models/attendanceModel.js";

/**
 * POST /extra
 * Body: { courseName, date, secret }
 * Adds an extra class for the given course and given date
 * Also updates attendance for that course (increments both attended and total)
 */
export const addExtra = async (req, res) => {
  try {
    const { courseName, date } = req.body;

    if (!courseName || !date) {
      return res.status(400).json({
        message: "courseName and date are required",
      });
    }

    const extraDate = new Date(date);

    if (isNaN(extraDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    // Normalize date to avoid time mismatches
    extraDate.setHours(0, 0, 0, 0);


    // Create extra class entry
    const extraEntry = await extraModel.create({
      courseName,
      extraDate,
    });

    // Update attendance for the course (increment both attended and total)
    const updatedCourse = await attendanceModel.findOneAndUpdate(
      { courseName: courseName },
      { 
        $inc: { 
          attended: 1,
          total: 1
        } 
      },
      { new: true }
    );

    if (!updatedCourse) {
      // If course doesn't exist in attendance, we still return success for extra class
      // but log a warning
      console.warn(`Course ${courseName} not found in attendance model`);
    }

    res.status(201).json({
      message: "Extra class added successfully and attendance updated",
      data: extraEntry,
      attendance: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

