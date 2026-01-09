import { Schema, model } from "mongoose";

const cancelSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  cancelledDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Avoid duplicate cancel entries for the same course and date
cancelSchema.index({ courseName: 1, cancelledDate: 1 }, { unique: true });

export const cancelModel = model("Cancel", cancelSchema);

