import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Category from '@/models/Category';
import { authOptions } from '../auth/[...nextauth]/auth';

// Get all categories for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Fetch categories
    const categories = await Category.find({ userId: session.user.id }).sort({ name: 1 });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new category
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, color, icon } = await req.json();

    // Validation
    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Please provide a category name' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if category with the same name already exists for this user
    const existingCategory = await Category.findOne({
      name,
      userId: session.user.id,
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category with this name already exists' },
        { status: 409 }
      );
    }

    // Create category
    const category = await Category.create({
      name,
      color: color || '#0ea5e9',
      icon: icon || 'folder',
      userId: session.user.id,
    });

    return NextResponse.json(
      { success: true, message: 'Category created successfully', category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 