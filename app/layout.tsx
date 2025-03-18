import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow - Smart Task Management',
  description: 'Manage your tasks smarter, not harder with AI-powered scheduling and organization.',
  keywords: 'task management, productivity, AI scheduling, task organization, todo app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 