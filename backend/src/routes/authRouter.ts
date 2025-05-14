import { Router, RequestHandler } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import StudentModel from "../models/StudentModel";

dotenv.config();
const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Handler to authenticate user via Google and return spireID
const handleGoogleAuth: RequestHandler = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.name) {
      res.status(400).json({ error: "Invalid token payload" });
      return;
    }

    let user = await StudentModel.findOne({ email: payload.email });

    if (!user) {
      // Auto-create new student with spireID only
      user = new StudentModel({
        name: payload.name,
        email: payload.email,
        personID: Math.floor(Math.random() * 1000000),
        spireID: Math.floor(Math.random() * 1000000000), // This is the identifier you'll use
        major: "Undeclared",
        authData: {
          userID: payload.email,
          password: "",
        },
        coursesTaken: [],
        courseTemplates: [],
      });

      await user.save();
    }

    //Send only spireID and name to frontend
    res.status(200).json({ message: "Login successful", spireID: user.spireID, name: user.name });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post("/auth/google", handleGoogleAuth);

export default router;
