import express, { Request, Response } from "express";
import multer from "multer"; //https://expressjs.com/en/resources/middleware/multer.html
import pdfParse from "pdf-parse";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

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
      const data = await pdfParse(pdfBuffer);
      console.log("Extracted Text:", data.text);
      res.json({ text: data.text }); // Return the parsed pdf file text
    } catch (error) {
      console.error("Error parsing PDF:", error);
      res.status(500).send("Error processing the PDF.");
    }
  }
);

export default router;
