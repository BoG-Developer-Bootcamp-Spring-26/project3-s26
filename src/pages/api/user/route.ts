import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "@/types/types";
import { createUser, deleteUser, getUser, updateUser } from "@/db/actions/user";
import connectDb from "@/db/connectDb";
import * as argon2 from "argon2";
import { connect } from "http2";


interface UserApiData {
    userData? : UserData;
    message : string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<UserApiData>,
) {
    if (req.method === 'POST') {
        try {
            if (!req.body.userName || !req.body.password) {
                res.status(500).json({
                    message: "New users must have a username and password"
                });
            }
            const argon2 = require('argon2');
            const hash = await argon2.hash(req.body.password);
            const userData = {
                userName : req.body.userName,
                password : hash,
            } as UserData
            await connectDb();
            const user = await createUser(userData);
            res.status(200).json({
                userData: userData,
                message: "User creation succesful"
            });
        } catch (e) {
            res.status(500).json({
                message: "There was an error in adding user to the database"
            });
        }
    }
}