import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "@server/mongodb/types/types";
import { createUser, getUser, updateUser, deleteUser } from "@server/mongodb/actions/user";
import connectDb from "../../../server/mongodb/connectDb";

type UserApiData = {
  userData?: UserData;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserApiData>,
) {
  if ( req.method === "POST" ) {
    try {
      if (!req.body.fullName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin || false,
      } as UserData;

      connectDb();
      const user = await createUser(userData);
      res.status(201).json({ 
        userData: user, 
        message: "User created successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Error creating user" 
      });
    }
  } else if ( req.method === "GET" ) {

  } else if ( req.method === "PUT" ) {
    
  } else if ( req.method === "DELETE" ) {
    
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
