import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from "@/db/actions/user.ts"; // Rename to match updated action
import connectDb from "server/mongodb/connectDb.ts";


interface UserApiData {
    users?: any[]; 
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserApiData>,
) {
    if (req.method === 'GET') {
        try {
            await connectDb();
            const users = await getAllUsers();

            if (!users || users.length === 0) {
                return res.status(404).json({
                    message: "There are no users to get"
                });
            }

            return res.status(200).json({
                users: users,
                message: "Users retrieved successfully"
            });

        } catch (e) {
            return res.status(500).json({
                message: "There was an error in retrieving the users"
            });
        }
    }
}