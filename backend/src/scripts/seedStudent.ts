import mongoose from "mongoose";
import dotenv from "dotenv";
import { exampleStudent } from "../models/Student";
import StudentModel from "../models/StudentModel";
import { connectDB } from "../db";

dotenv.config();

async function seedStudent() {
  await connectDB();

  const plainStudent = {
  personID: exampleStudent.getPersonID(),
  name: exampleStudent.name,
  email: exampleStudent.email,
  spireID: exampleStudent.spireID,
  major: exampleStudent.major,
  authData: {
    userID: exampleStudent.getAuthData().getUserID(),
    password: exampleStudent.getAuthData().getPasswordHash(),
  },
  coursesTaken: exampleStudent.coursesTaken.map(c => c.id),
  courseTemplates: exampleStudent.courseTemplates.map(template => ({
    name: template.name,
    semesters: template.getSemesters().map(sem => ({
    term: sem.getTerm(),
    year: sem.getYear(),
      courses: sem.getCourses().map(course => course.id)
    }))
  }))
};


  await StudentModel.deleteMany({ spireID: exampleStudent.spireID }); // prevent duplicates
  await StudentModel.create(plainStudent);

  console.log("Students updated successfully in the database");
  process.exit(0);
}

seedStudent();
