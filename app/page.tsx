import Link from 'next/link';
import Image from 'next/image';
import { FiCheckCircle, FiClock, FiClipboard, FiBell } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col">
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
              <div className="max-w-xl">
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                  Manage Your Tasks Smarter, Not Harder
                </h1>
                <p className="mb-8 text-lg text-primary-100">
                  TaskFlow uses AI to help you organize, prioritize, and schedule your tasks 
                  for maximum productivity. Stop stressing about your to-do list and start flowing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/auth/signin">
                    <button className="rounded-md bg-white px-6 py-3 font-medium text-primary-700 shadow-md hover:bg-primary-50">
                      Get Started
                    </button>
                  </Link>
                  <Link href="#features">
                    <button className="rounded-md border-2 border-white px-6 py-3 font-medium text-white hover:bg-white/10">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative h-80 w-full max-w-md md:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Productivity dashboard"
                  fill
                  className="rounded-lg object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Smart Features for Smart People
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                TaskFlow combines powerful task management with intelligent AI to help you work more effectively.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <FiCheckCircle size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Task Management</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create, organize, and categorize your tasks with ease.
                </p>
              </div>

              <div className="card flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <FiClock size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Smart Scheduling</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Let AI suggest the best times to complete your tasks based on your habits.
                </p>
              </div>

              <div className="card flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <FiBell size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Reminders</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Never miss a deadline with customizable notifications.
                </p>
              </div>

              <div className="card flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <FiClipboard size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualize your productivity and stay motivated with insightful analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-50 py-20 dark:bg-dark-200">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              What Our Users Say
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="card">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-primary-600">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="User avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "TaskFlow has completely transformed how I manage my team's projects. The AI scheduling is like having a personal assistant!"
                </p>
              </div>

              <div className="card">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-primary-600">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="User avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Freelance Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "As someone who juggles multiple projects, TaskFlow's categorization and priority systems help me stay focused on what matters most."
                </p>
              </div>

              <div className="card">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-primary-600">
                    <Image
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="User avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Student</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "The recurring tasks feature has been a game-changer for my study schedule. I never forget assignments anymore!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Productivity?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
              Join thousands of users who have revolutionized their work and personal task management with TaskFlow.
            </p>
            <Link href="/auth/signin">
              <button className="rounded-md bg-white px-8 py-3 font-medium text-primary-700 shadow-md hover:bg-primary-50">
                Start Free Trial
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <div className="flex items-center">
                <div className="mr-2 h-8 w-8 rounded bg-primary-600"></div>
                <span className="text-xl font-bold text-white">TaskFlow</span>
              </div>
              <p className="mt-2 max-w-md">
                Smart task management with AI-powered scheduling for optimal productivity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 md:grid-cols-3 lg:gap-x-24">
              <div>
                <h4 className="mb-3 text-lg font-semibold text-white">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-primary-400">Features</a></li>
                  <li><a href="#" className="hover:text-primary-400">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary-400">Testimonials</a></li>
                  <li><a href="#" className="hover:text-primary-400">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-semibold text-white">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary-400">About</a></li>
                  <li><a href="#" className="hover:text-primary-400">Blog</a></li>
                  <li><a href="#" className="hover:text-primary-400">Careers</a></li>
                  <li><a href="#" className="hover:text-primary-400">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-semibold text-white">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary-400">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary-400">Terms</a></li>
                  <li><a href="#" className="hover:text-primary-400">Security</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 