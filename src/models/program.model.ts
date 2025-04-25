import mongoose, { Schema, model, Document, Types } from "mongoose";

export enum ProgramType {
  EDUCATION = "Education",
  TREATMENT = "Treatment",
  RESEARCH = "Research",
}

export interface IProgram extends Document {
  name: string;
  description: string;
  program_type: ProgramType;
  target_disease: string;
  start_date: Date;
  end_date: Date;
  max_capacity: number;
  enrolled_clients: Types.ObjectId[];
  program_manager: Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}

const programSchema = new Schema<IProgram>(
  {
    name: {
      type: String,
      required: [true, "Program name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Program description is required"],
      trim: true,
    },
    program_type: {
      type: String,
      enum: Object.values(ProgramType),
      required: [true, "Program type is required"],
    },
    target_disease: {
      type: String,
      required: [true, "Target disease is required"],
      trim: true,
    },
    start_date: {
      type: Date,
      required: [true, "Start date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "End date is required"],
    },
    max_capacity: {
      type: Number,
      required: [true, "Maximum capacity is required"],
    },
    enrolled_clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
        default: [],
      },
    ],
    program_manager: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Program = model<IProgram>(
  "Program",
  programSchema
);
