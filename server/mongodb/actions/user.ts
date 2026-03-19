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

export async function getUsers() {
  const retrievedUsers = await User.find({}, { password: 0});
  return retrievedUsers;
}

export async function getUserByEmail(email: string) {
  const retrievedUser = await User.findOne({ email });
  return retrievedUser;
}

export async function deleteUser(userId: string) {
  await User.findByIdAndDelete(userId);
}
