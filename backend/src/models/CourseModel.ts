import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  credits: { type: Number, required: true },
  prerequisites: [{ type: String }] // Only store prerequisite IDs
});

const CourseModel = mongoose.model("Course", CourseSchema);

export default CourseModel;
