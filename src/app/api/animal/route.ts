// src/app/api/animal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import Animal from '@/models/Animal';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, breed, hoursTrained, profilePic, userId } = body;

    if (!name || !breed || hoursTrained === undefined || !profilePic || !userId) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 400 }
      );
    }

    const animal = await Animal.create({
      name,
      breed,
      hoursTrained,
      profilePic,
      userId,
    });

    return NextResponse.json(
      { message: 'Animal created successfully', animalId: animal._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/animal error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
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
    console.error('PATCH /api/animal error:', error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}