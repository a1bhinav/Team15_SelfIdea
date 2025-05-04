import { Course, courseExampleDatabase } from './Course';

export class Semester {
  private courses: Map<Course, string> = new Map();

  constructor(
    private term: string,
    private year: number
  ) { }

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


export let exampleSemesterDatabase: Semester[] = [
  new Semester("Fall", 2023),
  new Semester("Spring", 2024),
  new Semester("Fall", 2024),
  new Semester("Spring", 2025),
  new Semester("Fall", 2025),
  new Semester("Spring", 2026),
  new Semester("Fall", 2026),
  new Semester("Spring", 2027),
];

// Add 4 courses to each of the 8 example semesters
exampleSemesterDatabase[0].addCourse(courseExampleDatabase[0], "A"); // Fall 2023: Introduction to Mathematics
exampleSemesterDatabase[0].addCourse(courseExampleDatabase[1], "B+"); // Fall 2023: Introduction to Computer Science
exampleSemesterDatabase[0].addCourse(courseExampleDatabase[2], "A-"); // Fall 2023: Data Structures
exampleSemesterDatabase[0].addCourse(courseExampleDatabase[5], "B");  // Fall 2023: Advanced Topics in CS

exampleSemesterDatabase[1].addCourse(courseExampleDatabase[2], "A-"); // Spring 2024: Data Structures
exampleSemesterDatabase[1].addCourse(courseExampleDatabase[0], "A");  // Spring 2024: Introduction to Mathematics
exampleSemesterDatabase[1].addCourse(courseExampleDatabase[3], "B+"); // Spring 2024: Algorithms
exampleSemesterDatabase[1].addCourse(courseExampleDatabase[1], "A");  // Spring 2024: Introduction to Computer Science

exampleSemesterDatabase[2].addCourse(courseExampleDatabase[3], "B");  // Fall 2024: Algorithms
exampleSemesterDatabase[2].addCourse(courseExampleDatabase[4], "A");  // Fall 2024: Operating Systems
exampleSemesterDatabase[2].addCourse(courseExampleDatabase[0], "B+"); // Fall 2024: Introduction to Mathematics
exampleSemesterDatabase[2].addCourse(courseExampleDatabase[2], "A");  // Fall 2024: Data Structures

exampleSemesterDatabase[3].addCourse(courseExampleDatabase[4], "A-"); // Spring 2025: Operating Systems
exampleSemesterDatabase[3].addCourse(courseExampleDatabase[3], "B");  // Spring 2025: Algorithms
exampleSemesterDatabase[3].addCourse(courseExampleDatabase[1], "A");  // Spring 2025: Introduction to Computer Science
exampleSemesterDatabase[3].addCourse(courseExampleDatabase[5], "B+"); // Spring 2025: Advanced Topics in CS

exampleSemesterDatabase[4].addCourse(courseExampleDatabase[5], "A");  // Fall 2025: Advanced Topics in CS
exampleSemesterDatabase[4].addCourse(courseExampleDatabase[4], "B+"); // Fall 2025: Operating Systems
exampleSemesterDatabase[4].addCourse(courseExampleDatabase[2], "A");  // Fall 2025: Data Structures
exampleSemesterDatabase[4].addCourse(courseExampleDatabase[0], "B");  // Fall 2025: Introduction to Mathematics

exampleSemesterDatabase[5].addCourse(courseExampleDatabase[0], "A-"); // Spring 2026: Introduction to Mathematics
exampleSemesterDatabase[5].addCourse(courseExampleDatabase[1], "A");  // Spring 2026: Introduction to Computer Science
exampleSemesterDatabase[5].addCourse(courseExampleDatabase[3], "B+"); // Spring 2026: Algorithms
exampleSemesterDatabase[5].addCourse(courseExampleDatabase[4], "A");  // Spring 2026: Operating Systems

exampleSemesterDatabase[6].addCourse(courseExampleDatabase[1], "B");  // Fall 2026: Introduction to Computer Science
exampleSemesterDatabase[6].addCourse(courseExampleDatabase[2], "A+"); // Fall 2026: Data Structures
exampleSemesterDatabase[6].addCourse(courseExampleDatabase[4], "A-"); // Fall 2026: Operating Systems
exampleSemesterDatabase[6].addCourse(courseExampleDatabase[5], "B+"); // Fall 2026: Advanced Topics in CS

exampleSemesterDatabase[7].addCourse(courseExampleDatabase[2], "B+"); // Spring 2027: Data Structures
exampleSemesterDatabase[7].addCourse(courseExampleDatabase[3], "A");  // Spring 2027: Algorithms
exampleSemesterDatabase[7].addCourse(courseExampleDatabase[5], "A-"); // Spring 2027: Advanced Topics in CS
exampleSemesterDatabase[7].addCourse(courseExampleDatabase[0], "A");  // Spring 2027: Introduction to Mathematics