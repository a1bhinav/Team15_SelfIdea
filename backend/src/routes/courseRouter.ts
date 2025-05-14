import express, { Request, Response } from "express";
import CourseModel from "../models/CourseModel";
import mongoose from "mongoose";
import StudentModel from "../models/StudentModel";
import { CourseTemplate } from "../models/CourseTemplate";
const router = express.Router();

router.get("/course-ids", async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    const courses = await CourseModel.find({}, 'id').exec();
    const courseIds = courses.map(course => course.id);
    res.json(courseIds);
  } catch (error) {
    console.error("Error fetching course IDs:", error);
    res.status(500).json({ message: "Failed to fetch course IDs" });
  }
});

router.post("/append-course-template", async (req: Request, res: Response): Promise<any> => {
    const { studentId, courseTemplate } = req.body;

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    const student = await StudentModel.findOne({ spireID: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.courseTemplates) {
      student.courseTemplates = [];
    }
    student.courseTemplates.push(courseTemplate);
    await student.save();

    res.status(200).json({ message: "Course template appended successfully", student });
});

export default router;
