import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  personID: Number,
  name: String,
  email: String,
  spireID: Number,
  major: String,
  authData: {
    userID: Number,
    password: String,
  },
  coursesTaken: [String], // use course IDs for simplicity
  courseTemplates: [mongoose.Schema.Types.Mixed] // can store raw templates for now
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
