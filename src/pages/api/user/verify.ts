import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import argon2 from "argon2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectDB();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await argon2.verify(user.password, password);
    if (!valid) return res.status(400).json({ error: "Invalid password" });

    res.status(200).json({ userId: user._id, isAdmin: user.isAdmin });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}