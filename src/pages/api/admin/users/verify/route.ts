import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "@/types/types";
import { createUser, deleteUser, getUser, updateUser, getUserByUserName } from "@/db/actions/user";
import connectDb from "@/db/connectDb";
import * as argon2 from "argon2";
import { connect } from "http2";


interface UserApiData {
    verified? : boolean;
    userId? : string;
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
                    message: "Must provide username and password"
                })
            }

            await connectDb();
            const {userName, password} = req.body;
            const existUser = await getUserByUserName(userName);     
            if (!existUser) {
                return res.status(500).json({
                    verified: false,
                    message: "User not found"
                });
            }  
            
            if (existUser) {
                const passwordCheck = await argon2.verify(existUser.password, password);
                if (passwordCheck) {
                    return res.status(200).json({
                        message: "User succesfully verified",
                        userId: existUser._id,
                        verified: true,
                    });
                } else {
                    return res.status(500).json({
                        verified : false,
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