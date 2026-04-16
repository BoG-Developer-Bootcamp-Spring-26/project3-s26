import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select('-password');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}