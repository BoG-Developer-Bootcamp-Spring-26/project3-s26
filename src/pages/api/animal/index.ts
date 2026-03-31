import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Animal from "@/models/Animal";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    if (req.method === "POST") {
      const { name, breed, hoursTrained, imageUrl, ownerId } = req.body;
      const animal = await Animal.create({ name, breed, hoursTrained, imageUrl, ownerId });
      return res.status(200).json(animal);
    }

    if (req.method === "PATCH") {
      const { id, hoursTrained } = req.body;
      const updated = await Animal.findByIdAndUpdate(id, { hoursTrained }, { new: true });
      return res.status(200).json(updated);
    }

    res.status(405).end();
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}