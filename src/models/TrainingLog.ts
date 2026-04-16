import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITrainingLog extends Document {
  title: string;
  description: string;
  hours: number;
  date: Date;
  userId: mongoose.Types.ObjectId;
  animalId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TrainingLogSchema = new Schema<ITrainingLog>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    hours:       { type: Number, required: true, min: 0 },
    date:        { type: Date,   required: true, default: Date.now },
    userId:      { type: Schema.Types.ObjectId, ref: 'User',   required: true },
    animalId:    { type: Schema.Types.ObjectId, ref: 'Animal', required: true },
  },
  { timestamps: true }
);

const TrainingLog = models.TrainingLog || model<ITrainingLog>('TrainingLog', TrainingLogSchema);
export default TrainingLog;