import { Schema, model } from "mongoose";
import { Employer } from "../interfaces/interfaces.js";

const employerSchema = new Schema<Employer>({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyDescription: String,
    companyLogo: String,
    location: String,
    website: String,
  }, { timestamps: true});
  
export const employerModel = model<Employer>('Employer', employerSchema);
  