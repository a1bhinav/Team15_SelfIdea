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

    // Fetch courses with id, name, and credits fields
    // Adjust field names if your CourseModel uses different names (e.g., _id, courseName, courseCredits)
    const coursesFromDB = await CourseModel.find({}, '_id id name credits').exec();
    
    const courseObjects = coursesFromDB.map(course => ({
      id: course.id || course._id.toString(), // Prefer 'id' if it exists, otherwise use '_id'
      name: course.name,        // Assuming your model has a 'name' field
      credits: course.credits    // Assuming your model has a 'credits' field
    }));

    res.json(courseObjects);
  } catch (error) {
    console.error("Error fetching course data:", error);
    res.status(500).json({ message: "Failed to fetch course data" });
  }
});

router.get("/student-templates", async (req: Request, res: Response): Promise<any>  => {
  try {
    // spireID will be changes to google auth id and then we will use that to find the student
    const { spireID } = req.query;

    if (!spireID) {
      return res.status(400).json({ message: "spireID query parameter is required" });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    const student = await StudentModel.findOne({ spireID: spireID as string });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.courseTemplates || student.courseTemplates.length === 0) {
      return res.json([]); // Return empty array if no templates
    }

    // Map to the structure expected by the frontend: { id, title, description }
    // Assuming template.name is unique and can serve as an ID for removal purposes.
    // You might need to adjust the source of 'description'.
    const templateData = student.courseTemplates.map((template: any) => ({
      id: template.name, // Using name as ID, assuming it's the key for removal
      title: template.name,
      description: template.description || "Placeholder template description" // Adjust if your template object has a description
    }));

    return res.json(templateData);
  } catch (error) {
    console.error("Error fetching student templates:", error);
    return res.status(500).json({ message: "Failed to fetch student templates" });
  }
});

router.post("/append-course-template", async (req: Request, res: Response): Promise<any> => {
  try {
    // in this case we are doing it by spireid. studentid is the spireid
    //TODOD need to make the id be connected to google auth in the db
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
  } catch (error) {
    console.error("Error appending course template:", error);
    res.status(500).json({ message: "Failed to append course template" });
  }
});

router.post("/remove-course-template", async (req: Request, res: Response): Promise<any> => {
  try {
    const { studentId, courseTemplateName } = req.body;

    if (!studentId || !courseTemplateName) {
      return res.status(400).json({ message: "Student ID and Course Template Name are required" });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    const student = await StudentModel.findOne({ spireID: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.courseTemplates || student.courseTemplates.length === 0) {
      return res.status(404).json({ message: "No course templates found for this student" });
    }

    const initialLength = student.courseTemplates.length;
    student.courseTemplates = student.courseTemplates.filter(
      (template: any) => template.name !== courseTemplateName
    );

    if (student.courseTemplates.length === initialLength) {
      return res.status(404).json({ message: `Course template with name '${courseTemplateName}' not found` });
    }

    await student.save();

    res.status(200).json({ message: "Course template removed successfully", student });
  } catch (error) {
    console.error("Error removing course template:", error);
    res.status(500).json({ message: "Failed to remove course template" });
  }
});


export default router;
