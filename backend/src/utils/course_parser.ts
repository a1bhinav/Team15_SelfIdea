const extractCourseHistory = (text: string): string => {
  const regexPatterns =
    /\b(Spring|Fall|A|A-|B\+|B|B-|C\+|C|C-|D\+|D|F|IF|INC|__|AUD|CR|DR|IP|NR|P|SAT|W|WF|WP|Y)\b/;

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
