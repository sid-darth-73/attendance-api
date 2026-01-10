import { cancelModel } from "../models/cancelModel.js";

/**
 * POST /cancel
 * Body: { courseName, date, secret }
 * Marks a class as cancelled for a given course on a given day
 */
export const markCancelled = async (req, res) => {
  try {
    const { courseName, date } = req.body;

    if (!courseName || !date) {
      return res.status(400).json({
        message: "courseName and date are required",
      });
    }

    const cancelledDate = new Date(date);

    if (isNaN(cancelledDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    // Normalize date to avoid time mismatches
    cancelledDate.setHours(0, 0, 0, 0);

    // Prevent duplicate entry for same course + date
    const existing = await cancelModel.findOne({
      courseName,
      cancelledDate,
    });

    if (existing) {
      return res.status(409).json({
        message: "Cancellation already recorded for this course on this date",
      });
    }

    const cancelledEntry = await cancelModel.create({
      courseName,
      cancelledDate,
    });

    res.status(201).json({
      message: "Cancellation marked successfully",
      data: cancelledEntry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

