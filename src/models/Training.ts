import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  title: String,
  description: String,
  hours: Number,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
});

export default mongoose.models.Training || mongoose.model("Training", TrainingSchema);