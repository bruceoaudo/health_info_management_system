import { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";
import { verifyPassword } from "../utils/password";
import { createToken, TokenPayload } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({message:"All fields must be filled"})
    }

    // Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await verifyPassword(doctor.password, password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = createToken({ id: doctor._id } as TokenPayload);

    // Send token as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      domain:
        process.env.NODE_ENV === "development"
          ? "localhost"
          : ".yourdomain.com",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
