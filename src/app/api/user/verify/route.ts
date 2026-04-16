import { NextRequest, NextResponse } from 'next/server';
import * as argon2 from 'argon2';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 500 }
      );
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { userId: user._id, isAdmin: user.isAdmin },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/user/verify error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}