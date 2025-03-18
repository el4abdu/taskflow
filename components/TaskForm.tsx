"use client";

import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiX } from 'react-icons/fi';

interface Category {
  _id: string;
  name: string;
  color: string;
}

interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date | string;
  scheduledTime?: Date | string;
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

interface TaskFormProps {
  initialTask?: Task;
  categories: Category[];
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  onRequestAiScheduling?: (taskData: {
    taskId?: string;
    taskTitle: string;
    taskDescription?: string;
    taskPriority: string;
  }) => void;
}

const defaultTask: Task = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  category: '',
  dueDate: undefined,
  scheduledTime: undefined,
  isRecurring: false,
  recurringPattern: undefined,
};

const TaskForm = ({
  initialTask,
  categories,
  onSubmit,
  onCancel,
  onRequestAiScheduling
}: TaskFormProps) => {
  const [task, setTask] = useState<Task>(initialTask || defaultTask);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialTask) {
      setTask({
        ...initialTask,
        dueDate: initialTask.dueDate 
          ? formatDateForInput(new Date(initialTask.dueDate as string))
          : undefined,
        scheduledTime: initialTask.scheduledTime 
          ? formatTimeForInput(new Date(initialTask.scheduledTime as string))
          : undefined,
      });
    }
  }, [initialTask]);

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const formatTimeForInput = (date: Date): string => {
    return date.toISOString().slice(0, 16);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (task.isRecurring && !task.recurringPattern) {
      newErrors.recurringPattern = 'Please select a recurring pattern';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTask({
        ...task,
        [name]: checked,
      });
      return;
    }

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formattedTask = {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate as string) : undefined,
      scheduledTime: task.scheduledTime ? new Date(task.scheduledTime as string) : undefined,
    };

    onSubmit(formattedTask);
  };

  const handleAiSchedule = () => {
    if (!task.title.trim()) {
      setErrors({ title: 'Title is required for AI scheduling' });
      return;
    }

    if (onRequestAiScheduling) {
      onRequestAiScheduling({
        taskId: task._id,
        taskTitle: task.title,
        taskDescription: task.description,
        taskPriority: task.priority,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className={`input mt-1 ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Task title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description || ''}
          onChange={handleChange}
          rows={3}
          className="input mt-1"
          placeholder="Task description"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="input mt-1"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="input mt-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={task.category || ''}
          onChange={handleChange}
          className="input mt-1"
        >
          <option value="">No Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiCalendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate as string || ''}
              onChange={handleChange}
              className="input pl-10"
            />
            {task.dueDate && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                onClick={() => setTask({ ...task, dueDate: undefined })}
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Scheduled Time
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiClock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              id="scheduledTime"
              name="scheduledTime"
              value={task.scheduledTime as string || ''}
              onChange={handleChange}
              className="input pl-10"
            />
            {task.scheduledTime && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                onClick={() => setTask({ ...task, scheduledTime: undefined })}
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {onRequestAiScheduling && (
        <button
          type="button"
          onClick={handleAiSchedule}
          className="btn bg-gradient-to-r from-purple-600 to-primary-600 text-white hover:from-purple-700 hover:to-primary-700"
        >
          Get AI Scheduling Suggestion
        </button>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isRecurring"
          name="isRecurring"
          checked={task.isRecurring || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="isRecurring" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Recurring Task
        </label>
      </div>

      {task.isRecurring && (
        <div>
          <label htmlFor="recurringPattern" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Recurring Pattern
          </label>
          <select
            id="recurringPattern"
            name="recurringPattern"
            value={task.recurringPattern || ''}
            onChange={handleChange}
            className={`input mt-1 ${errors.recurringPattern ? 'border-red-500' : ''}`}
          >
            <option value="">Select Pattern</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {errors.recurringPattern && (
            <p className="mt-1 text-sm text-red-500">{errors.recurringPattern}</p>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 