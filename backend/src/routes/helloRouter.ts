import express, { Request, Response } from "express";
import { courseExampleDatabase } from "../models/Course";
import { exampleSemesterDatabase } from "../models/Semester";
import { exampleCourseTemplate } from "../models/CourseTemplate";
import { exampleStudent } from "../models/Student";

const router = express.Router();

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
  console.log(courseExampleDatabase)
  console.log(exampleSemesterDatabase)
  console.log(exampleCourseTemplate)
  console.log(exampleStudent)
});

export default router;
