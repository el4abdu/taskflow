import { NextResponse } from 'next/server';
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
    
    // Create default test user - password will be hashed by the User model's pre-save hook
    const user = await User.create({
      name: 'Abdu',
      email: 'abdu@taskflow.com',
      password: '1234',
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