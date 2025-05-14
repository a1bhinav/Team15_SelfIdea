import { Course } from "../models/Course";

// Define an interface for the parser's output
export interface ParsedCourseEntry {
  course: Course;
  grade: string;
  term: string;
}

const extractCourseHistory = (text: string): ParsedCourseEntry[] => {
  const lines = text.split("\n");
  console.log(text);

  const parsedEntries: ParsedCourseEntry[] = [];
  let currentTerm: string = "Unknown Term"; // Default term
  const termLineRegex = /^\s*(Spring|Fall|Winter|Summer)\s+\d{4}\s*$/i; // Regex to identify term lines

  // Regex to capture:
  // 1. Course ID (e.g., "MATH 411", "COMPSCI 501")
  // 2. Course Name (e.g., "Intro to Abstract Algebra I")
  // 3. Credits (e.g., "3.000")
  // 4. Grade (e.g., "C+", "A", "SAT") - captured but not used in Course object yet
  const courseParseRegex =
    /^([A-Z]+\s+\d+)\s*([A-Za-z0-9\s().:',&\/-]+?)\s*(?:No Rule)?\s*(\d+\.\d+)\s*(?:(?:\d+\.\d+)\s*)?([A-Z][+-]?|\b(?:CR|DR|IP|IF|INC|NR|P|SAT|W|WF|WP|Y)\b)/;
    // Adjusted course name to include more characters like (),:',&/-
    // Corrected course ID part to not capture a trailing letter from the name

  for (const line of lines) {
    if (termLineRegex.test(line)) {
      currentTerm = line.trim();
      // This line is a term header, so we update currentTerm and skip to the next line
      continue;
    }

    // Try to parse the line as a course
    const match = line.match(courseParseRegex);
    if (match) {
      const id = match[1].replace(/\s+/g, ' ').trim();
      const name = match[2].trim();
      const credits = parseFloat(match[3]);
      const grade = match[4];

      // Ensure that we are not parsing a semester header as a course
      // A simple heuristic: if the name looks like a semester, skip it.
      // This might need refinement but is less critical if term lines are properly skipped earlier.
      if (/\b(Spring|Fall|Winter|Summer)\s+\d{4}\b/.test(name) || name.length < 3) { // also skip very short names
          continue;
      }

      if (!isNaN(credits)) {
        const course = new Course(name, id, credits, []);
        parsedEntries.push({ course, grade, term: currentTerm });
      }
    }
  }
  return parsedEntries;
};

export default extractCourseHistory;
