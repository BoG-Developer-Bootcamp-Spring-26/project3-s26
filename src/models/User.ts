// src/models/User.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string; // stored as argon2 hash
  isAdmin: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isAdmin:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model recompilation in Next.js hot reload
const User = models.User || model<IUser>('User', UserSchema);
export default User;