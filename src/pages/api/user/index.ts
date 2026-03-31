import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import argon2 from "argon2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectDB();
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}