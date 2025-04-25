import { Request, Response } from "express";
import { Client } from "../models/client.model";

export const getAllClients = async (req: Request, res: Response) => {
  try {
    
    const doctorId = req.id;
    if (!doctorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to perfom this action" });
    }

    const clients = await Client.find();
    return res.status(200).json({ clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve clients.", error });
  }
};
