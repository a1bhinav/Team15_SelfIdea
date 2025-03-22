import express, { Request, Response } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.post("/upload-pdf", upload.single("pdfFile"), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  try {
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    console.log("Extracted Text:", data.text);
    res.json({ text: data.text });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).send("Error processing the PDF.");
  }
});

export default router;
