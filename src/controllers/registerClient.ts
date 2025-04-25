import { Request, Response } from "express";
import { Client, Gender } from "../models/client.model"; // Adjust the path as needed

export const registerClient = async (req: Request, res: Response) => {
  try {
    const { fullName, phone, email, date_of_birth, gender, id_number } =
      req.body;
    
    const doctorId = req.id
    if (!doctorId) {
      return res.status(403).json({message:"Unauthorized to perfom this action"})
    }

    // Check for missing fields
    if (
      !fullName ||
      !phone ||
      !email ||
      !date_of_birth ||
      !gender ||
      !id_number
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Validate gender
    if (!Object.values(Gender).includes(gender)) {
      return res.status(400).json({ message: "Invalid gender" });
    }

    // Check for existing client by email (Avoid duplicates)
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res
        .status(409)
        .json({ message: "Client with this email already exists" });
    }

    const client = new Client({
      fullName,
      phone,
      email,
      date_of_birth: new Date(date_of_birth),
      gender,
      id_number,
    });

    await client.save();

    res.status(201).json({ message: "Client registered successfully", client });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
