import { Schema, model } from "mongoose";

const extraSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  extraDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const extraModel = model("Extra", extraSchema);

