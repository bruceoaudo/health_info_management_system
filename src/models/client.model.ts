import { Schema, model, Document, Types } from "mongoose";

enum Gender {
  M = "M",
  F = "F",
}

interface Address {
  country: string;
  county: string;
  city: string;
  postal_code: string;
}

interface IClient extends Document {
  fullName: string;
  date_of_birth: Date;
  gender: Gender;
  id_number: string;
  physical_address: Address;
  phone: string;
  email: string;
  selected_programs: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<Address>(
  {
    country: { type: String, required: true },
    county: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
  },
  { _id: false } // Prevents separate _id for subdocument
);

const clientSchema = new Schema<IClient>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    date_of_birth: {
      type: Date,
      required: [true, "DOB is required"],
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: [true, "Gender is required"],
    },
    id_number: {
      type: String,
      required: [true, "ID number is required"],
      trim: true,
    },
    physical_address: {
      type: addressSchema,
      required: true,
    },
    selected_programs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Program",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Client = model<IClient>("Client", clientSchema);
