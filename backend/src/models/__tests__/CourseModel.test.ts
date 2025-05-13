import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import CourseModel from "../CourseModel";

describe("CourseModel", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // Disconnect and stop the in-memory MongoDB server
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clear the database after each test
    await CourseModel.deleteMany({});
  });

  it("should create and save a course successfully", async () => {
    const courseData = {
      name: "Introduction to Mathematics",
      id: "MATH101",
      credits: 3,
      prerequisites: []
    };

    const course = new CourseModel(courseData);
    const savedCourse = await course.save();

    expect(savedCourse._id).toBeDefined();
    expect(savedCourse.name).toBe(courseData.name);
    expect(savedCourse.id).toBe(courseData.id);
    expect(savedCourse.credits).toBe(courseData.credits);
    expect(savedCourse.prerequisites).toEqual(courseData.prerequisites);
  });

  it("should not save a course without required fields", async () => {
    const courseData = {
      id: "MATH101",
      credits: 3
    };

    const course = new CourseModel(courseData);

    await expect(course.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should enforce unique course IDs", async () => {
    const courseData = {
      name: "Introduction to Mathematics",
      id: "MATH101",
      credits: 3,
      prerequisites: []
    };

    const course1 = new CourseModel(courseData);
    const course2 = new CourseModel(courseData);

    await course1.save();
    await expect(course2.save()).rejects.toThrow();
  });
});
