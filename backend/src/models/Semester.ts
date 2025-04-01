import { Course } from './Course';

export class Semester {
  private courses: Map<Course, string> = new Map();

  constructor(
    private term: string,
    private year: number
  ) {}

  addCourse(c: Course, grade: string): void {
    this.courses.set(c, grade);
  }

  removeCourse(c: Course): void {
    this.courses.delete(c);
  }

  getSemesterCredits(): number {
    let credits = 0;
    this.courses.forEach((_, course) => {
      credits += course.credits;
    });
    return credits;
  }

  calculateGPA(): number {
    // Implement GPA calculation logic
    return 4.0; // placeholder
  }
}
