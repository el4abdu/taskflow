import { useState } from 'react';
import Link from 'next/link';
import { FiClock, FiFlag, FiEdit2, FiTrash2, FiMoreVertical, FiCheckCircle } from 'react-icons/fi';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date;
  scheduledTime?: Date;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: 'todo' | 'in-progress' | 'completed') => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const isOverdue = (date: Date | undefined) => {
    if (!date) return false;
    return new Date(date) < new Date() && task.status !== 'completed';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStatusToggle = () => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    onStatusChange(task._id, newStatus);
  };

  return (
    <div className={`card transition-all duration-200 ${
      task.status === 'completed' 
        ? 'opacity-75' 
        : isOverdue(task.dueDate) 
          ? 'border-red-300 dark:border-red-800' 
          : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button 
            onClick={handleStatusToggle}
            className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
              task.status === 'completed' 
                ? 'bg-green-500 text-white' 
                : 'border border-gray-300 dark:border-gray-700'
            }`}
            aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.status === 'completed' && <FiCheckCircle className="h-4 w-4" />}
          </button>
          
          <div>
            <h3 className={`font-medium ${
              task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {task.description.length > 100 
                  ? `${task.description.substring(0, 100)}...` 
                  : task.description}
              </p>
            )}
            
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {task.priority && (
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${priorityColors[task.priority]}`}>
                  <FiFlag className="mr-1 h-3 w-3" /> {task.priority}
                </span>
              )}
              
              {task.category && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  {task.category}
                </span>
              )}
              
              {task.dueDate && (
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  isOverdue(task.dueDate)
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  <FiClock className="mr-1 h-3 w-3" /> {formatDate(task.dueDate)}
                </span>
              )}
              
              {task.scheduledTime && (
                <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  <FiClock className="mr-1 h-3 w-3" /> {formatTime(task.scheduledTime)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-label="Task options"
          >
            <FiMoreVertical className="h-5 w-5" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-dark-100">
              <button
                onClick={() => {
                  onEdit(task);
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-200"
              >
                <FiEdit2 className="mr-2 h-4 w-4" /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task._id);
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-200"
              >
                <FiTrash2 className="mr-2 h-4 w-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 