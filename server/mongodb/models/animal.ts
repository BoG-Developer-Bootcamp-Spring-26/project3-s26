import mongoose, { Types } from "mongoose";

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, breed: {
        type: String,
        required: true
    }, owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }, hoursTrained: {
        type: Number,
        required: true
    }, profilePicture: {
        type: String,
        required: false
    }
});

export default mongoose.model("Animal", );