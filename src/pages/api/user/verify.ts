import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import argon2 from "argon2";

interface VerifyApiData {
    id?: string;
    fullName?: string;
    admin?: boolean;
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<VerifyApiData>
) {
    if (req.method === "POST") {
        try {
            await connectDB();

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(500).json({ message: "Invalid credentials." });
            }

            const valid = await argon2.verify(user.password, req.body.password);
            if (!valid) {
                return res.status(500).json({ message: "Invalid credentials." });
            }

            res.status(200).json({
                id: user._id,
                fullName: user.fullName,
                admin: user.admin,
                message: "User verified.",
            });
        } catch (e) {
            res.status(500).json({ message: "There was an error verifying the user." });
        }
    }
}