import { Semester, exampleSemesterDatabase } from './Semester';

export class CourseTemplate {
  constructor(
    public name: string,
    private semesters: Semester[] = []
  ) { }

  getSemesters(): Semester[] {
    return this.semesters;
  }

  calculateTotalCredits(): number {
    return this.semesters.reduce((total, sem) => total + sem.getSemesterCredits(), 0);
  }

  validateTemplate(): boolean {
    // Implement validation logic
    return true;
  }

  getRemainingRequirements(): string[] {
    // Implement logic
    return [];
  }

  calculateCumGPA(): number {
    const totalPoints = this.semesters.reduce((acc, sem) => acc + sem.calculateGPA(), 0);
    return totalPoints / this.semesters.length;
  }
}


export let exampleCourseTemplate = new CourseTemplate(
  "Comprehensive Program",
  [
    exampleSemesterDatabase[0], // Fall 2023
    exampleSemesterDatabase[1], // Spring 2024
    exampleSemesterDatabase[2], // Fall 2024
    exampleSemesterDatabase[3], // Spring 2025
    exampleSemesterDatabase[4], // Fall 2025
    exampleSemesterDatabase[5], // Spring 2026
    exampleSemesterDatabase[6], // Fall 2026
    exampleSemesterDatabase[7], // Spring 2027
  ]
);

