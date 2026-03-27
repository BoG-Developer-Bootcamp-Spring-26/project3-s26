import { UserData } from "@/types/types";
import user from "@/server/mongodb/models/User";

export async function createUser(userData : UserData) {
    const newUser = new user(UserData);
    await newUser.save();
    return newUser;
}

export async function getAllUsers() {
    const retrievedUser = await user.find({}).select("-password");
    return retrievedUser;
}

export async function updateUser(userId: string, newData : UserData) {
    const updatedUser = await user.findByIdAndUpdate(userId, newData);
    return updatedUser;
}

export async function getUserByUserName(userName: string) {
    return await user.findOne({userName});
}


export async function deleteUser(userId: string) {
    await user.findByIdAndDelete(userId);
}