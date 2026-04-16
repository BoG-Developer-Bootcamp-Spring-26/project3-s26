import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import argon2 from "argon2";

interface UserApiData {
  id?: string;
  fullName?: string;
  admin?: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserApiData>
) {
  if (req.method === "POST") {
    try {
      if (!req.body.fullName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Full name, email, and password are required!" });
      }

      await connectDB();
      const hashed = await argon2.hash(req.body.password);
      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashed,
        admin: req.body.admin ?? false,
      });

      res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        admin: user.admin,
        message: "User successfully created.",
      });
    } catch (e) {
      res.status(500).json({ message: "There was an error creating the user." });
    }
  }
}