import { ObjectId } from "mongoose";

export interface UserData {
    fullName: string; 
    email: string; 
    password: string; 
    admin: boolean;
}

export interface AnimalData {
    name: string; 
    breed: string;
    owner: ObjectId;
    hoursTrained: number;
}

export interface TrainingData {
    user : ObjectId;
    animal : ObjectId; 
    title : String;
    date : Date; 
    description : String;
    hours : number;
}