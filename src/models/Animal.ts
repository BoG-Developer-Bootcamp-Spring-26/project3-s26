import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  hoursTrained: Number,
  imageUrl: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Animal || mongoose.model("Animal", AnimalSchema);