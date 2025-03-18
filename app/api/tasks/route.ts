import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';
import { authOptions } from '../auth/[...nextauth]/auth';

// Get all tasks for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Connect to database
    await connectToDatabase();

    // Build query
    const query: any = { userId: session.user.id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    // Sort options
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Fetch tasks
    const tasks = await Task.find(query).sort(sort);

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new task
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, status, priority, category, dueDate, scheduledTime, 
      isRecurring, recurringPattern, assignedTo } = await req.json();

    // Validation
    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Please provide a task title' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Create task
    const task = await Task.create({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      category,
      dueDate,
      scheduledTime,
      userId: session.user.id,
      isRecurring: isRecurring || false,
      recurringPattern,
      assignedTo,
    });

    return NextResponse.json(
      { success: true, message: 'Task created successfully', task },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 