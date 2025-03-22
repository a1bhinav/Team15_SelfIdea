const extractCourseHistory = (text: string): string => {
  const regexPatterns =
    /\b(Spring|Fall|A|A-|B\+|B|B-|C\+|C|C-|D\+|D|F|IF|INC|__|AUD|CR|DR|IP|NR|P|SAT|W|WF|WP|Y)\b/;
  // see https://www.umass.edu/registrar/grading-system-gpa-calculation
  // added Spring and Fall for semester parsing. 

  //TODO: will probably need to change regex to use course codes like CHEM or COMPSCI instead of grades 
  //This would solve the in progress course parsing issue
  const lines = text.split("\n");
  console.log(text);

  const extractedLines: string[] = [];

  for (const line of lines) {
    if (regexPatterns.test(line)) {
      extractedLines.push(line);
    }
  }
  return extractedLines.join("\n");
};

export default extractCourseHistory;
