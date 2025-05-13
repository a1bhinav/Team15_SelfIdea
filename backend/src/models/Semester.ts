import { Course, courseExampleDatabase } from './Course';

export class Semester {
  // the string is the grade of the course
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
    const gpaScale: { [key: string]: number } = {
      "A": 4.0,
      "A-": 3.7,
      "B+": 3.3,
      "B": 3.0,
      "B-": 2.7,
      "C+": 2.3,
      "C": 2.0,
      "C-": 1.7,
      "D+": 1.3,
      "D": 1.0,
      "F": 0.0,
    };

    // Grades that count for credits but not for GPA points (e.g., Pass/Fail)
    // or grades that don't count for credits in GPA calculation either (e.g. W, AUD)
    const nonGpaGrades = ["P", "SAT", "CR", "DR", "W", "WF", "WP", "AUD", "IP", "INC", "NR", "IF", "__"];

    let totalQualityPoints = 0;
    let totalGpaCredits = 0;

    this.courses.forEach((grade, course) => {
      const gradeValue = gpaScale[grade];

      if (gradeValue !== undefined) {
        // This is a grade that has a quality point value (A-F)
        totalQualityPoints += gradeValue * course.credits;
        totalGpaCredits += course.credits;
      } else if (!nonGpaGrades.includes(grade.toUpperCase())) {
        // Potentially an unknown grade that isn't explicitly non-GPA.
        // For now, we'll log it and not include it in GPA calculation.
        // Depending on policy, such grades might be treated as F or ignored.
        // Current UMass policy might count some (like IF not resolved) as F.
        // For simplicity here, we ignore if not in gpaScale and not in common nonGpaGrades.
        console.warn(`Unrecognized grade "${grade}" for course ${course.id} not included in GPA calculation.`);
      }
      // Courses with grades in nonGpaGrades (like P, SAT, W) are skipped for both quality points and GPA credits.
      // Some policies might include 'F' from 'WF' in GPA. Current regex in parser might already give 'F'.
    });

    if (totalGpaCredits === 0) {
      return 0; // Avoid division by zero if no courses are eligible for GPA calculation
    }

    return totalQualityPoints / totalGpaCredits;
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