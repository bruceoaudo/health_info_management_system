import { Request, Response } from "express";
import { Client } from "../models/client.model";

export const searchForClient = async (req: Request, res: Response) => {
  try {
    // Extract search query parameters from the request
    const { name, email } = req.query;

    // Build the query object based on provided parameters
    let query: any = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
    }

    if (email) {
      query.email = { $regex: email, $options: "i" }; // Case-insensitive search for email
    }

    // Search for clients based on the constructed query
    const clients = await Client.find(query);

    // Check if any clients were found
    if (clients.length === 0) {
      return res
        .status(404)
        .json({ message: "No clients found matching the search criteria" });
    }

    // Return the found clients
    return res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
