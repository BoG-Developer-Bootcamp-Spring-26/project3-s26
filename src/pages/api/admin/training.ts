import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Training from "@/models/Training";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if (req.method !== "GET") return res.status(405).end();

  const logs = await Training.find().populate("userId").populate("animalId");
  res.status(200).json(logs);
}