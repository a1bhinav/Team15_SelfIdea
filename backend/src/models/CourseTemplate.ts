import { Semester } from './Semester';

export class CourseTemplate {
  constructor(
    public name: string,
    private semesters: Semester[] = []
  ) {}

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
