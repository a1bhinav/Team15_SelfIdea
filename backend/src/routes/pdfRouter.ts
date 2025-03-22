import express, { Request, Response } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import extractCourseHistory from "../utils/course_parser"; // Import your course extraction function

const upload = multer({ storage: multer.memoryStorage() }); // Set multer storage to memory
const router = express.Router();

// Receives the pdf file and parses it.
router.post(
  "/parse-pdf",
  upload.single("pdfFile"),
  async (req: Request, res: Response): Promise<void> => {
    //  Check if a file was uploaded. If not, send a 400 response
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    try {
      const pdfBuffer = req.file.buffer; // extract the uploaded PDF file from the request to pass to pdfParse
      const data = await pdfParse(pdfBuffer); // This is where the parsing happens
      const extracted_courses = extractCourseHistory(data.text);
      console.log("Extracted Text:", extracted_courses);
      res.json({ text: extracted_courses }); // Return the parsed pdf file text
    } catch (error) {
      console.error("Error parsing PDF:", error);
      res.status(500).send("Error processing the PDF.");
    }
  }
);

export default router;
