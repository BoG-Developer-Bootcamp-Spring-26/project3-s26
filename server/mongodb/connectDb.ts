import mongoose from "mongoose";

export default async function connectDb() {
    try {
        await mongoose.connect(process.env.DB_URL!);
    } catch (e) {
        console.log("Unable to connect", e);
    }
}