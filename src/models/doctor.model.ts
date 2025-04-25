import { Schema, model, Document } from "mongoose";

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

export interface IDoctor extends Document {
  fullName: string;
  date_of_birth: Date;
  gender: Gender;
  license_number: string;
  specialty: string;
  years_of_experience: number;
  phone: string;
  email: string;
  password: string;
  office_address: Address;
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
  { _id: false }
);

const doctorSchema = new Schema<IDoctor>(
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
    password: {
      type: String,
      reuired: [true, "Password is required"],
      trim: true
    },
    date_of_birth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: [true, "Gender is required"],
    },
    license_number: {
      type: String,
      required: [true, "Medical license number is required"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
    },
    years_of_experience: {
      type: Number,
      required: [true, "Years of experience is required"],
      min: [0, "Experience must be 0 or more"],
    },
    office_address: {
      type: addressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = model<IDoctor>("Doctor", doctorSchema);
