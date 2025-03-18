"use client";

import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Mock data
const completionData = {
  labels: ['Completed', 'In Progress', 'Todo'],
  datasets: [
    {
      data: [15, 5, 8],
      backgroundColor: ['#10b981', '#6366f1', '#f59e0b'],
      borderColor: ['#065f46', '#4338ca', '#b45309'],
      borderWidth: 1,
    },
  ],
};

const weeklyProgressData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Tasks Completed',
      data: [3, 5, 2, 4, 6, 2, 1],
      backgroundColor: 'rgba(14, 165, 233, 0.7)',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 1,
    },
  ],
};

const categoryData = {
  labels: ['Work', 'Personal', 'Study', 'Health', 'Other'],
  datasets: [
    {
      label: 'Tasks by Category',
      data: [12, 8, 5, 3, 2],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(161, 98, 247, 0.7)',
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(161, 98, 247, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const TaskStats = () => {
  // Use refs to store chart instances for potential updates - with correct type annotations
  const completionChartRef = useRef<any>(null);
  const weeklyChartRef = useRef<any>(null);
  const categoryChartRef = useRef<any>(null);

  // Chart options
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    cutout: '70%',
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // Effect for handling dark mode changes or other theme updates
  useEffect(() => {
    // This would normally update chart colors based on theme
    // For now, it's just a placeholder for real implementation
  }, []);

  return (
    <div className="card">
      <h2 className="mb-6 text-xl font-bold">Task Analytics</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-4 text-center text-lg font-medium">Task Status</h3>
          <div className="h-64">
            <Doughnut
              data={completionData}
              options={doughnutOptions}
              ref={completionChartRef}
            />
          </div>
        </div>
        
        <div>
          <h3 className="mb-4 text-center text-lg font-medium">Weekly Progress</h3>
          <div className="h-64">
            <Bar
              data={weeklyProgressData}
              options={barOptions}
              ref={weeklyChartRef}
            />
          </div>
        </div>
        
        <div>
          <h3 className="mb-4 text-center text-lg font-medium">By Category</h3>
          <div className="h-64">
            <Doughnut
              data={categoryData}
              options={doughnutOptions}
              ref={categoryChartRef}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-dark-100">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Productivity Insights:</strong> You've completed 65% of your tasks this week, which is 15% higher than last week. Your most productive day is Friday.
        </p>
      </div>
    </div>
  );
};

export default TaskStats; 