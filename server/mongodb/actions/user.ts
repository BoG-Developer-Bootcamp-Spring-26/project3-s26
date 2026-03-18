import { UserData } from "../types/types";
import User from "../models/User";

export async function createUser(userData: UserData) {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
}

export async function getUser(userId: string) {
  const retrievedUser = await User.findById(userId);
  return retrievedUser;
}

export async function updateUser(userId: string, newData: UserData) {
  const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
  return updatedUser;
}

export async function deleteUser(userId: string) {
  await User.findByIdAndDelete(userId);
}
