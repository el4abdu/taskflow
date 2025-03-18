import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';
import { authOptions } from '../../auth/[...nextauth]/route';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { taskId, taskTitle, taskDescription, taskPriority, preferredTimeRanges } = await req.json();

    if (!taskId && !taskTitle) {
      return NextResponse.json(
        { success: false, message: 'Please provide task information' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Get user's existing tasks to consider for scheduling
    const userTasks = await Task.find({ 
      userId: session.user.id,
      status: { $ne: 'completed' },
      scheduledTime: { $exists: true }
    }).select('title scheduledTime priority');

    // Format task data for AI
    const existingTasksData = userTasks.map(task => ({
      title: task.title,
      scheduledTime: task.scheduledTime ? new Date(task.scheduledTime).toISOString() : null,
      priority: task.priority
    }));

    // Create prompt for Gemini AI
    const currentDateTime = new Date().toISOString();
    const prompt = `As a task scheduling assistant, recommend the best time to schedule this task:
Task: ${taskTitle || '(Need task info from database)'}
Description: ${taskDescription || 'N/A'}
Priority: ${taskPriority || 'medium'}
Current date and time: ${currentDateTime}
User's preferred time ranges: ${preferredTimeRanges ? JSON.stringify(preferredTimeRanges) : 'No specific preferences'}

User's existing scheduled tasks:
${JSON.stringify(existingTasksData, null, 2)}

Analyze the user's existing schedule and task priorities. Consider task priority, appropriate spacing between tasks, and user's preferred time ranges if provided.

Provide output in JSON format only with this structure:
{
  "recommendedTime": "ISO date string",
  "reasoning": "Brief explanation of why this time was chosen",
  "conflictingTasks": ["List of task titles that might conflict"]
}`;

    // Generate response from Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI response doesn't contain valid JSON");
    }
    
    const recommendation = JSON.parse(jsonMatch[0]);

    // If taskId is provided, update the task with the recommended time
    if (taskId) {
      await Task.findOneAndUpdate(
        { _id: taskId, userId: session.user.id },
        { scheduledTime: new Date(recommendation.recommendedTime) }
      );
    }

    return NextResponse.json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error('Error in AI scheduling:', error);
    return NextResponse.json(
      { success: false, message: 'AI scheduling failed' },
      { status: 500 }
    );
  }
} 