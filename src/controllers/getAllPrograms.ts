import { Request, Response } from "express";
import { Program } from "../models/program.model";

export const getAllPrograms = async (req: Request, res: Response) => {
  try {
    const doctorId = req.id;
    if (!doctorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to perfom this action" });
    }

    const programs = await Program.find();
    return res.status(200).json({ programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve programs.", error });
  }
};
