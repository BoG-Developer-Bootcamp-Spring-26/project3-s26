import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Animal from "@/models/Animal";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if (req.method !== "GET") return res.status(405).end();

  const animals = await Animal.find().populate("ownerId");
  res.status(200).json(animals);
}