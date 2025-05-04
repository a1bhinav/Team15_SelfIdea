import { Person } from './Person';
import { Course, courseExampleDatabase } from './Course';
import { CourseTemplate, exampleCourseTemplate } from './CourseTemplate';
import { AuthData } from './AuthData';
import { Role } from './Person';

export class Student extends Person {
  public coursesTaken: Course[] = [];
  public courseTemplates: CourseTemplate[] = [];

  constructor(
    personID: number,
    name: string,
    authData: AuthData,
    email: string,
    public spireID: number,
    public major: string
  ) {
    super(personID, name, authData, Role.Student, email);
  }

  setSpireID(id: number): void {
    this.spireID = id;
  }

  setMajor(major: string): void {
    this.major = major;
  }

  getCoursesTaken(): Course[] {
    return this.coursesTaken;
  }

  getCourseTemplates(): CourseTemplate[] {
    return this.courseTemplates;
  }

  appendCourseTemplate(c: CourseTemplate): void {
    this.courseTemplates.push(c);
  }

  removeCourseTemplate(c: CourseTemplate): void {
    this.courseTemplates = this.courseTemplates.filter(template => template !== c);
  }
}

const exampleAuthData: AuthData = new AuthData(1, "secure_password_hash");


export const exampleStudent = new Student(
  54321,
  "Jane Doe",
  exampleAuthData,
  "jane.doe@example.edu",
  20202020,
  "Mathematics"
);

// Add courses taken directly from courseExampleDatabase
exampleStudent.coursesTaken.push(courseExampleDatabase[0]); // Introduction to Mathematics
exampleStudent.coursesTaken.push(courseExampleDatabase[1]); // Introduction to Computer Science
exampleStudent.coursesTaken.push(courseExampleDatabase[2]); // Data Structures

// Add the exampleCourseTemplate directly
exampleStudent.appendCourseTemplate(exampleCourseTemplate);
