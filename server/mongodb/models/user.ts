import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, middleName: {
        type: String,
        required: false
    }, lastName: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", )