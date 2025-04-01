import { Person } from './Person';
import { Course } from './Course';
import { CourseTemplate } from './CourseTemplate';

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
