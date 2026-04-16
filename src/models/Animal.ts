// src/models/Animal.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IAnimal extends Document {
  name: string;
  breed: string;
  hoursTrained: number;
  profilePic: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AnimalSchema = new Schema<IAnimal>(
  {
    name:         { type: String, required: true, trim: true },
    breed:        { type: String, required: true, trim: true },
    hoursTrained: { type: Number, required: true, default: 0, min: 0 },
    profilePic:   { type: String, required: true },
    userId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Animal = models.Animal || model<IAnimal>('Animal', AnimalSchema);
export default Animal;