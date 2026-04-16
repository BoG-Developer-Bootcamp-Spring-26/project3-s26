import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import Animal from '@/models/Animal';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    const { name, breed, userId, hoursTrained, profilePic } = body;

    if (!name || !breed || !userId || hoursTrained === undefined || !profilePic) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }

    const newAnimal = new Animal({ name, breed, userId, hoursTrained, profilePic });
    await newAnimal.save();

    return NextResponse.json(newAnimal, { status: 201 });
  } catch (error) {
    console.error("BACKEND ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    const { animalId, ...updateData } = body;

    if (!animalId) {
      return NextResponse.json(
        { message: "animalId is required to update an animal" }, 
        { status: 400 }
      );
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      animalId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAnimal) {
      return NextResponse.json(
        { message: "Animal not found in the database" }, 
        { status: 400 }
      );
    }

    return NextResponse.json(updatedAnimal, { status: 200 });

  } catch (error) {
    console.error("BACKEND ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}