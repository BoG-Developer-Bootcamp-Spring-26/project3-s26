import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import TrainingLog from '@/models/TrainingLog';
import Animal from '@/models/Animal';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, animalId, title, description, hours } = body;

    if (!userId || !animalId || !title || !description || hours === undefined) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }

    const foundAnimal = await Animal.findById(animalId);

    if (!foundAnimal) {
      return NextResponse.json(
        { message: "Animal not found" }, 
        { status: 400 }
      );
    }

    if (foundAnimal.userId.toString() !== userId) {
      return NextResponse.json(
        { message: "Animal does not belong to specified user" }, 
        { status: 400 }
      );
    }

    const newLog = new TrainingLog({
      userId,
      animalId,
      title,
      date: new Date(),
      description,
      hours
    });

    await newLog.save();

    foundAnimal.hoursTrained += hours;
    await foundAnimal.save();

    return NextResponse.json(newLog, { status: 200 });

  } catch (error) {
    console.error("BACKEND ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}