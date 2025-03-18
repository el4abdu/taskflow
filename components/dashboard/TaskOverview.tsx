import { useState } from 'react';
import { FiClock, FiCalendar, FiFilter } from 'react-icons/fi';
import TaskCard from '../TaskCard';

// Mock data - in a real app, this would come from an API call
const mockTasks = [
  {
    _id: '1',
    title: 'Complete project proposal',
    description: 'Finish writing the project proposal document with all requirements and specifications.',
    status: 'in-progress' as const,
    priority: 'high' as const,
    category: 'Work',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
  },
  {
    _id: '2',
    title: 'Schedule team meeting',
    description: 'Set up a meeting with the team to discuss next sprint goals',
    status: 'todo' as const,
    priority: 'medium' as const,
    category: 'Work',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
  },
  {
    _id: '3',
    title: 'Grocery shopping',
    description: 'Buy groceries for the week',
    status: 'todo' as const,
    priority: 'low' as const,
    category: 'Personal',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
  },
  {
    _id: '4',
    title: 'Review pull requests',
    description: 'Review and approve team pull requests',
    status: 'completed' as const,
    priority: 'high' as const,
    category: 'Work',
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const TaskOverview = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  const handleEdit = (task: any) => {
    console.log('Edit task:', task);
    // In a real app, this would open a modal or navigate to an edit page
  };

  const handleDelete = (taskId: string) => {
    console.log('Delete task:', taskId);
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  const handleStatusChange = (taskId: string, status: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(t => 
      t._id === taskId ? { ...t, status } : t
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.status !== 'completed';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Task Overview</h2>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-gray-300 dark:border-gray-700">
            <button
              className={`px-3 py-1 text-sm ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-200 dark:text-gray-300 dark:hover:bg-dark-100'
              } rounded-l-md transition-colors`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm ${
                filter === 'active' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-200 dark:text-gray-300 dark:hover:bg-dark-100'
              } transition-colors`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 text-sm ${
                filter === 'completed' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-200 dark:text-gray-300 dark:hover:bg-dark-100'
              } rounded-r-md transition-colors`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-100">
            <FiFilter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-4 text-center text-gray-500 dark:bg-dark-100 dark:text-gray-400">
            No tasks found. Create a new task to get started!
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskOverview; 