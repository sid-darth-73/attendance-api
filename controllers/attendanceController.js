import { attendanceModel } from "../models/attendanceModel.js";

// GET : get all attendance for all the courses
export const getAttendance = async (req, res) => {
    try {
        const attendanceData = await attendanceModel.find({});
        res.status(200).json(attendanceData);
    } catch (error) {
        res.status(500).json({
            message: "error fetching attendance"
        })
    }
}

// PATCH : update the attendance for a course
export const updateAttendance = async (req, res) => {
    const { courseName, incrementAttended, incrementTotal } = req.body;

    try {
        if(!courseName) {
            return res.status(400).json({ message: "courseName is required" });
        }

        const updateFields = {};
        if (typeof incrementAttended === 'number' && incrementAttended !== 0) {
            updateFields.attended = incrementAttended;
        }
        if (typeof incrementTotal === 'number' && incrementTotal !== 0) {
            updateFields.total = incrementTotal;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid increments provided" });
        }

        const updatedCourse = await attendanceModel.findOneAndUpdate(
            { courseName: courseName },
            { $inc: updateFields },
            { new: true } 
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error });
    }
};

// POST: Add a new course 
export const addCourse = async (req, res) => {
    try {
        const newCourse = new attendanceModel(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: "Error adding course", error });
    }
};