import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import StudentModel from "../StudentModel";

describe("StudentModel", () => {
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
    await StudentModel.deleteMany({});
  });

  it("should create and save a student successfully", async () => {
    const studentData = {
      personID: 12345,
      name: "John Doe",
      email: "john.doe@example.com",
      spireID: 20202020,
      major: "Computer Science",
      authData: {
        userID: 1,
        password: "secure_password_hash",
      },
      coursesTaken: ["CS101", "MATH101"],
      courseTemplates: [{ templateName: "Template 1" }],
    };

    const student = new StudentModel(studentData);
    const savedStudent = await student.save();

    expect(savedStudent._id).toBeDefined();
    expect(savedStudent.personID).toBe(studentData.personID);
    expect(savedStudent.name).toBe(studentData.name);
    expect(savedStudent.email).toBe(studentData.email);
    expect(savedStudent.spireID).toBe(studentData.spireID);
    expect(savedStudent.major).toBe(studentData.major);
    expect(savedStudent.authData).toEqual(studentData.authData);
    expect(savedStudent.coursesTaken).toEqual(studentData.coursesTaken);
    expect(savedStudent.courseTemplates).toEqual(studentData.courseTemplates);
  });

  it("should save coursesTaken as an array of strings", async () => {
    const studentData = {
      personID: 12345,
      name: "John Doe",
      email: "john.doe@example.com",
      spireID: 20202020,
      major: "Mathematics",
      authData: {
        userID: 1,
        password: "secure_password_hash",
      },
      coursesTaken: ["CS101", "MATH101"],
    };

    const student = new StudentModel(studentData);
    const savedStudent = await student.save();

    expect(savedStudent.coursesTaken).toEqual(["CS101", "MATH101"]);
  });

  it("should save courseTemplates as an array of mixed types", async () => {
    const studentData = {
      personID: 12345,
      name: "John Doe",
      email: "john.doe@example.com",
      spireID: 20202020,
      major: "Mathematics",
      authData: {
        userID: 1,
        password: "secure_password_hash",
      },
      courseTemplates: [{ templateName: "Template 1" }, { templateName: "Template 2" }],
    };

    const student = new StudentModel(studentData);
    const savedStudent = await student.save();

    expect(savedStudent.courseTemplates).toEqual([
      { templateName: "Template 1" },
      { templateName: "Template 2" },
    ]);
  });
});
