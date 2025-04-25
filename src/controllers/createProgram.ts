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
        .json({ message: "Unauthorized to perform this action" });
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

    // Check if program with same name already exists
    const existingProgram = await Program.findOne({ name });
    if (existingProgram) {
      return res.status(409).json({
        message: "Program with this name already exists"
      });
    }

    // Validate date range
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (startDate >= endDate) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    // Validate max capacity
    if (max_capacity <= 0) {
      return res.status(400).json({
        message: "Max capacity must be greater than 0",
      });
    }

    const program = new Program({
      name,
      description,
      program_type,
      target_disease,
      start_date: startDate,
      end_date: endDate,
      max_capacity,
      enrolled_clients: [],
      program_manager: doctorId,
    });

    await program.save();

    res.status(201).json({
      message: "Program created successfully"
    });
  } catch (error) {
    console.error("Error creating program:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
