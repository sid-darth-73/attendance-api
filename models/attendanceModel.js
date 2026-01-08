import { model, Schema } from "mongoose";

const attendanceSchema = new Schema({
    courseName: {
    type: String,
    required: true,
    unique: true,
    trim: true
    },
    attended: {
      type: Number,
      required: true,
      default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

export const attendanceModel = model('Attendance', attendanceSchema);