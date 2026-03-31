import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Training from "@/models/Training";
import Animal from "@/models/Animal";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    if (req.method === "POST") {
      const { title, description, hours, userId, animalId } = req.body;

      const animal = await Animal.findById(animalId);
      if (!animal || animal.ownerId.toString() !== userId) return res.status(400).json({ error: "Animal not owned by user" });

      const training = await Training.create({ title, description, hours, userId, animalId });

      animal.hoursTrained += hours;
      await animal.save();

      return res.status(200).json(training);
    }

    res.status(405).end();
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}