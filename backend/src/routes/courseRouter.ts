import express, { Request, Response } from "express";
import CourseModel from "../models/CourseModel";
import mongoose from "mongoose";

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

export default router;
