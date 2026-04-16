import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import TrainingLog from '@/models/TrainingLog';

export async function GET() {
  try {
    await connectDB();
    const trainingLogs = await TrainingLog.find({});
    return NextResponse.json(trainingLogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}