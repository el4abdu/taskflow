"use client";

import { FiClock, FiCalendar } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API call
const upcomingTasks = [
  {
    id: '1',
    title: 'Team weekly meeting',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Client presentation',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    priority: 'high',
  },
  {
    id: '3',
    title: 'Project deadline',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    priority: 'high',
  },
  {
    id: '4',
    title: 'Follow up with marketing',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 28), // 28 hours from now
    priority: 'low',
  },
];

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.round(diffInHours * 60);
    return `In ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
  } else if (diffInHours < 24) {
    const hours = Math.round(diffInHours);
    return `In ${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    const days = Math.round(diffInHours / 24);
    return `In ${days} day${days !== 1 ? 's' : ''}`;
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
};

const UpcomingTasks = () => {
  return (
    <div className="card">
      <h2 className="mb-4 text-xl font-bold">Upcoming Tasks</h2>
      
      <div className="space-y-4">
        {upcomingTasks.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-4 text-center text-gray-500 dark:bg-dark-100 dark:text-gray-400">
            No upcoming tasks
          </div>
        ) : (
          upcomingTasks.map(task => (
            <div key={task.id} className="flex items-start rounded-lg border border-gray-200 p-3 dark:border-gray-700">
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiClock className="mr-1 h-3 w-3" />
                  <span>{formatTime(task.dueDate)}</span>
                  <span className="mx-1">•</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">{formatRelativeTime(task.dueDate)}</span>
                </div>
              </div>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                {task.priority}
              </span>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
        <a href="/calendar" className="flex items-center justify-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          <FiCalendar className="mr-2 h-4 w-4" />
          View full calendar
        </a>
      </div>
    </div>
  );
};

export default UpcomingTasks; 