import { Router, RequestHandler } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import StudentModel from "../models/StudentModel";

dotenv.config();
const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Handler that returns void
const handleGoogleAuth: RequestHandler = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.sub || !payload.name) {
      res.status(400).json({ error: "Invalid token" });
      return;
    }

    let user = await StudentModel.findOne({ email: payload.email });

    if (!user) {
      // Auto-create new student
      user = new StudentModel({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        personID: Math.floor(Math.random() * 1000000), // Or a better unique ID generator
        spireID: Math.floor(Math.random() * 1000000000),
        major: "Undeclared",
        authData: {
          userID: payload.sub,
          password: "", // Optional — or put a dummy hashed password
        },
        coursesTaken: [],
        courseTemplates: [],
      });

      await user.save();
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      await user.save();
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post("/auth/google", handleGoogleAuth);

export default router;
