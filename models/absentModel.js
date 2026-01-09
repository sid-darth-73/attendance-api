import { Schema, model } from "mongoose";

const absentSchema = new Schema({
    courseName: {
    type: String,
    required: true,
    trim: true
    },
    absentDate: {
        type: Date,
        required: true, 
        default: Date.now
    },
   
    createdAt: {
      type: Date,
      default: Date.now
    }
});
absentSchema.index({ courseName: 1, absentDate: 1 }, { unique: true });

export const absentModel = model('Absent', absentSchema);
