import { Request, Response } from "express";
import { Client } from "../models/client.model";

export const getClientProfile = async (req: Request, res: Response) => {
  try {
    const doctorId = req.id;
    if (!doctorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to perfom this action" });
    }

    const clientId = req.params.id;

    const clientProfile = await Client.findById(clientId);

    // Check if the client exists
    if (!clientProfile) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Return the client profile
    return res.status(200).json(clientProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
