import User from "../models/user";
import { UserData } from "../../../src/types/types";

export async function createUser(userData: UserData) {
    const user = new User(userData);
    await user.save();
}

export async function getUser(userId: string) {
    const user = User.findById(userId);
    return user;

}

export async function updateUser(userId: string, newData: UserData) {
    const user = User.findByIdAndUpdate(userId, newData);
    return user;
}

export async function deleteUser(userId: string) {
    await User.findByIdAndDelete(userId);12

}