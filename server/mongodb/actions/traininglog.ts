import { TrainingLogData } from "../types/types";
import TrainingLog from "../models/TrainingLog";

export async function createTrainingLog(trainingLogData: TrainingLogData) {
  const newTrainingLog = new TrainingLog(trainingLogData);
  await newTrainingLog.save();
  return newTrainingLog;
}

export async function getTrainingLog(trainingLogId: string) {
  const retrievedTrainingLog = await TrainingLog.findById(trainingLogId);
  return retrievedTrainingLog;
}

export async function updateTrainingLog(trainingLogId: string, newData: TrainingLogData) {
  const updatedTrainingLog = await TrainingLog.findByIdAndUpdate(trainingLogId, newData, { new: true });
  return updatedTrainingLog;
}

export async function deleteTrainingLog(trainingLogId: string) {
  await TrainingLog.findByIdAndDelete(trainingLogId);
}
