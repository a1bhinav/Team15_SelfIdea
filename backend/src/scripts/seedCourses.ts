import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import CourseModel from "../models/CourseModel";

dotenv.config();

async function seedCourses() {
  try {
    const db = process.env.MONGO_URI!;
    await mongoose.connect(db);


    console.log("Connected to MongoDB");

    const dataPath = path.join(__dirname, "courses.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const rawCourses = JSON.parse(rawData);
    const courses = rawCourses.map((course: any) => ({
        id: course.number,                 // <- map `number` to `id`
        name: course.name,
        credits: course.credits,
        prerequisites: course.prerequisites || []
        }));


    await CourseModel.deleteMany({});
    await CourseModel.insertMany(courses);

    console.log("Courses seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding courses:", err);
    process.exit(1);
  }
}

seedCourses();
