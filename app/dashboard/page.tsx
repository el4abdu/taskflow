import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { FiPlus, FiList, FiCalendar, FiClock, FiPieChart } from 'react-icons/fi';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import TaskOverview from '@/components/dashboard/TaskOverview';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import TaskStats from '@/components/dashboard/TaskStats';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {session.user?.name}! Here's your productivity overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/tasks/new">
            <button className="btn-primary flex items-center gap-2">
              <FiPlus className="h-4 w-4" /> New Task
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="card flex items-center gap-4 p-6">
          <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            <FiList className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
            <h3 className="text-2xl font-bold">24</h3>
          </div>
        </div>

        <div className="card flex items-center gap-4 p-6">
          <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-300">
            <FiClock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            <h3 className="text-2xl font-bold">5</h3>
          </div>
        </div>

        <div className="card flex items-center gap-4 p-6">
          <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
            <FiCalendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Due Today</p>
            <h3 className="text-2xl font-bold">3</h3>
          </div>
        </div>

        <div className="card flex items-center gap-4 p-6">
          <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
            <FiPieChart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            <h3 className="text-2xl font-bold">78%</h3>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskOverview />
        </div>
        <div>
          <UpcomingTasks />
        </div>
      </div>

      <div className="mt-8">
        <TaskStats />
      </div>
    </div>
  );
} 