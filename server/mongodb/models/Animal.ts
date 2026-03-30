import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({

    name: String, 
    breed: String, 
    owner: mongoose.Schema.Types.ObjectId,
    hoursTrained: mongoose.Schema.Types.Number, 

});

export default mongoose.model("Animal", animalSchema);