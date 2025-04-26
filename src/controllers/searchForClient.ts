import { Client } from "../models/client.model";
import { Request, Response } from "express";

export const searchForClient = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    let query: any = {};
    if (name) {
      query.fullName = { $regex: name, $options: "i" }; // Changed from 'name' to 'fullName'
    }

    const clients = await Client.find(query);

    // Always return 200 with clients array (even if empty)
    return res.status(200).json({
      success: true,
      clients: clients,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
