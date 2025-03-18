import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'abdu@taskflow.com' });
    
    if (existingUser) {
      return NextResponse.json({ 
        message: 'Test user already exists', 
        user: {
          name: existingUser.name,
          email: existingUser.email,
        }
      });
    }

    // Create a hashed password
    const hashedPassword = await hash('1234', 12);
    
    // Create default test user
    const user = await User.create({
      name: 'Abdu',
      email: 'abdu@taskflow.com',
      password: hashedPassword,
      image: 'https://ui-avatars.com/api/?name=Abdu&background=random',
    });

    return NextResponse.json({ 
      message: 'Test user created successfully', 
      user: {
        name: user.name,
        email: user.email,
      }
    });
    
  } catch (error: any) {
    console.error('Error creating test user:', error);
    return NextResponse.json(
      { message: 'Error creating test user: ' + error.message },
      { status: 500 }
    );
  }
} 