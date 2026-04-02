import { TrainingData } from "@/types/types";
import trainingData from "../models/Training";

export async function createLog(log: TrainingData) {
    const newLog = new trainingData(log);
    await newLog.save();
    return newLog;
}

export async function updateLog(logId: string, newData: TrainingData) {
    const updatedLog = await trainingData.findByIdAndUpdate(logId, newData);
    return updatedLog;
}

export async function getAllLogs() {
    const allLogs = await trainingData.find({});
    return allLogs;
}