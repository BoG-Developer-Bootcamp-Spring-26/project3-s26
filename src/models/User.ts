import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // enforces unique email addresses for all users
    },
    password: { 
        type: String, 
        required: true 
    },
    admin: { 
        type: Boolean, 
        default: false 
    },
});
// first part added because Next.js supposedly hot reloads; first part to check if user model already exists
export default mongoose.models.User || mongoose.model("User", UserSchema);