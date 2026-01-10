import { absentModel } from "../models/absentModel.js";

/**
 * POST /absent
 * Body: { courseName, date, secret }
 * Marks the user absent for a course on a given day
 */
export const markAbsent = async (req, res) => {
  try {
    const { courseName, date } = req.body;

    if(!courseName || !date) {
      return res.status(400).json({
        message: "courseName and date are required",
      });
    }

    const absentDate = new Date(date);

    if (isNaN(absentDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    // Normalize date to avoid time mismatches
    absentDate.setHours(0, 0, 0, 0);

    // Prevent duplicate entry for same course + date
    const existing = await absentModel.findOne({
      courseName,
      absentDate,
    });

    if (existing) {
      return res.status(409).json({
        message: "Absence already marked for this course on this date",
      });
    }

    const absentEntry = await absentModel.create({
      courseName,
      absentDate,
    });

    res.status(201).json({
      message: "Absence marked successfully",
      data: absentEntry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
