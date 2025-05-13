import { Course } from "../models/Course";

const extractCourseHistory = (text: string): Course[] => {
  const initialFilterRegex =
    /\b(Spring|Fall|A|A-|B\+|B|B-|C\+|C|C-|D\+|D|F|IF|INC|__|AUD|CR|DR|IP|NR|P|SAT|W|WF|WP|Y)\b/;
  // see https://www.umass.edu/registrar/grading-system-gpa-calculation
  // added Spring and Fall for semester parsing. 

  //TODO: will probably need to change regex to use course codes like CHEM or COMPSCI instead of grades 
  //This would solve the in progress course parsing issue
  const lines = text.split("\n");
  console.log(text);

  const extractedLines: string[] = [];

  for (const line of lines) {
    if (initialFilterRegex.test(line)) {
      extractedLines.push(line);
    }
  }

  const courses: Course[] = [];
  // Regex to capture:
  // 1. Course ID (e.g., "MATH 411", "COMPSCI 501")
  // 2. Course Name (e.g., "Intro to Abstract Algebra I")
  // 3. Credits (e.g., "3.000")
  // 4. Grade (e.g., "C+", "A", "SAT") - captured but not used in Course object yet
  const courseParseRegex =
    /^([A-Z]+\s+\d+)\s*([A-Za-z0-9\s().:',&\/-]+?)\s*(?:No Rule)?\s*(\d+\.\d+)\s*(?:(?:\d+\.\d+)\s*)?([A-Z][+-]?|\b(?:CR|DR|IP|IF|INC|NR|P|SAT|W|WF|WP|Y)\b)/;
    // Adjusted course name to include more characters like (),:',&/-
    // Corrected course ID part to not capture a trailing letter from the name

  for (const line of extractedLines) {
    const match = line.match(courseParseRegex);
    if (match) {
      const id = match[1].replace(/\s+/g, ' ').trim();
      const name = match[2].trim();
      const credits = parseFloat(match[3]);
      // const grade = match[4]; // Grade is captured but not used in the Course object as per current definition

      // Ensure that we are not parsing a semester header as a course
      // A simple heuristic: if the name looks like a semester, skip it.
      // This might need refinement.
      if (/\b(Spring|Fall|Winter|Summer)\s+\d{4}\b/.test(name) || name.length < 3) { // also skip very short names
          continue;
      }

      if (!isNaN(credits)) {
        courses.push(new Course(name, id, credits, []));
      }
    }
  }
  return courses;
};

export default extractCourseHistory;
