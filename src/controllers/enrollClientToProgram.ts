import { Request, Response } from "express";
import { Client } from "../models/client.model";
import { Program } from "../models/program.model"

export const enrollClientToProgram = async (req: Request, res: Response) => {
//   try {
//     const {
//       clientId,
//       programId,
//       fullName,
//       phone,
//       email,
//       date_of_birth,
//       gender,
//       id_number,
//       physical_address,
//     } = req.body;

//     const doctorId = req.id;
//     if (!doctorId) {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized to perfom this action" });
//     }

//     if (!clientId || !programId) {
//       return res
//         .status(400)
//         .json({ message: "Client ID and Program ID are required." });
//     }

//     const client = await Client.findById(clientId);
//     if (!client) {
//       return res.status(404).json({ message: "Client not found." });
//     }

//     const program = await Program.findById(programId);
//     if (!program) {
//       return res.status(404).json({ message: "Program not found." });
//     }

//     // Check if client is already enrolled
//     if (client.selected_programs.includes(program._id)) {
//       return res
//         .status(400)
//         .json({ message: "Client is already enrolled in this program." });
//     }

//     // Check if program is full
//     if (program.enrolled_clients.length >= program.max_capacity) {
//       return res
//         .status(400)
//         .json({ message: "Program has reached maximum capacity." });
//     }

//     // Update missing client information if provided
//     if (fullName) client.fullName = fullName;
//     if (phone) client.phone = phone;
//     if (email) client.email = email;
//     if (date_of_birth) client.date_of_birth = new Date(date_of_birth);
//     if (gender) client.gender = gender;
//     if (id_number) client.id_number = id_number;
//     if (physical_address) {
//       client.physical_address = {
//         country: physical_address.country || client.physical_address.country,
//         county: physical_address.county || client.physical_address.county,
//         city: physical_address.city || client.physical_address.city,
//         postal_code:
//           physical_address.postal_code || client.physical_address.postal_code,
//       };
//     }

//     // Enroll client
//     client.selected_programs.push(program._id);
//     program.enrolled_clients.push(client._id);

//     // Save both documents
//     await client.save();
//     await program.save();

//     return res.status(200).json({ message: "Client enrolled successfully." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong.", error });
//   }
};
