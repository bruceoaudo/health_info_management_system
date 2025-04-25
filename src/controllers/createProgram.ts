import { Request, Response } from "express";
import { Program, ProgramType } from "../models/program.model";

export const createProgram = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      program_type,
      target_disease,
      start_date,
      end_date,
      max_capacity,
    } = req.body;

    const doctorId = req.id;
    if (!doctorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to perfom this action" });
    }

    // Validate required fields
    if (
      !name ||
      !description ||
      !program_type ||
      !target_disease ||
      !start_date ||
      !end_date ||
      !max_capacity
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate program_type
    if (!Object.values(ProgramType).includes(program_type)) {
      return res.status(400).json({ message: "Invalid program type" });
    }

    const program = new Program({
      name,
      description,
      program_type,
      target_disease,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      max_capacity,
      enrolled_clients: [],
      program_manager: doctorId,
    });

    await program.save();

    res.status(201).json({ message: "Program created successfully", program });
  } catch (error) {
    console.error("Error creating program:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};