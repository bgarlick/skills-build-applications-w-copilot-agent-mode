import { Schema } from 'mongoose';

export const resourceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);