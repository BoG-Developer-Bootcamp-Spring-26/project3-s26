import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "@/types/types";
import { createUser, deleteUser, getUser, updateUser, getUserByEmail } from "@/server/mongodb/actions/user";
import connectDb from "@/server/connectDb";
import * as argon2 from "argon2";
import { connect } from "http2";


interface UserApiData {
    isAdmin? : boolean;
    userId? : string;
    message : string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<UserApiData>,
) {
    if (req.method === 'POST') {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(500).json({
                    message: "Must provide email and/or password"
                })
            }

            await connectDb();
            const email = req.body.email;
            const password = req.body.password;
            const isAdmin = req.body.admin;
            const existUser = await getUserByEmail(email);     
            if (!existUser) {
                return res.status(500).json({
                    message: "User not found"
                });
            }  
            
            if (existUser) {
                const passwordCheck = await argon2.verify(existUser.password, password);
                if (passwordCheck) {
                    return res.status(200).json({
                        message: "User succesfully verified",
                        userId: existUser._id,
                        isAdmin: isAdmin,
                    });
                } else {
                    return res.status(500).json({
                        message: "Incorrect password"
                    });
                }
            }
        } catch (e) {
            res.status(500).json({
                message: "There was an error in verifying the user"
            });
        }
    }
}