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
    await User.findByIdAndDelete(userId);

}

// admin functions - all paginated
// cursor is the last id of the previous page's object.
// if getting 1st page, use cursor = null
// limit is number of objects you want returned in your page
export async function getAllUsers(cursor: string, limit: number) {
    if (cursor == null) {
        // get 1st page
        return User.find().limit(limit)
    }

    const users = User.find({'_id': {'$gt': cursor}}).limit(limit)
    return users;
}