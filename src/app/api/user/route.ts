import { NextRequest, NextResponse } from 'next/server';
import * as argon2 from 'argon2';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, password, isAdmin } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isAdmin: isAdmin ?? false,
    });

    return NextResponse.json(
      { message: 'User created successfully', userId: user._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}