import { Request, Response } from "express";
import { Client } from "../models/client.model";
import mongoose from "mongoose";

export const getClientProfileExternal = async (req: Request, res: Response) => {
  try {
    // Validate the client ID parameter
    const clientId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_ID_FORMAT",
        message: "Provided client ID is not valid",
      });
    }

    // Find the client by ID with only necessary fields
    const client = await Client.findById(clientId)
      .select(
        "fullName date_of_birth gender id_number phone email physical_address selected_programs"
      )
      .lean();

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "CLIENT_NOT_FOUND",
        message: "No client found with the provided ID",
      });
    }

    // Transform the data for external consumption
    const responseData = {
      clientId: client._id,
      identification: {
        fullName: client.fullName,
        governmentId: client.id_number,
        gender: client.gender,
        dateOfBirth: client.date_of_birth?.toISOString().split("T")[0], // Format as YYYY-MM-DD
      },
      contactInformation: {
        phone: client.phone,
        email: client.email,
        address: client.physical_address
          ? {
              city: client.physical_address.city,
              region: client.physical_address.county,
              country: client.physical_address.country,
              postalCode: client.physical_address.postal_code,
            }
          : null,
      },
      programEnrollments:
        client.selected_programs?.map((p) => p.toString()) || [],
      lastUpdated: client.updatedAt, // If you want to include this
    };

    // Set cache headers for system consumers
    res.set("Cache-Control", "public, max-age=300"); // 5 minute cache

    return res.status(200).json({
      apiVersion: "1.0",
      data: responseData,
      systemMetadata: {
        timestamp: new Date().toISOString(),
        sourceSystem: "HIMS", // Health Information Management System
      },
    });
  } catch (error) {
    console.error(`External API Error: ${error}`);
    return res.status(500).json({
      success: false,
      error: "INTERNAL_ERROR",
      message: "An internal system error occurred",
      systemError:
        process.env.NODE_ENV === "development" ? error : undefined,
      timestamp: new Date().toISOString(),
    });
  }
};
