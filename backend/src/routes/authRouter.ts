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

    if (!payload?.email) {
      res.status(400).json({ error: "Invalid token" });
      return;
    }

    const user = await StudentModel.findOne({ email: payload.email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ message: "Login successful", user });
    return;
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

router.post("/auth/google", handleGoogleAuth);

export default router;
