import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import Animal from '@/models/Animal';

export async function GET() {
  try {
    await connectDB();
    const animals = await Animal.find({});
    return NextResponse.json(animals, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}