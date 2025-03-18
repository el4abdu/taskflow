import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow - Smart Task Management',
  description: 'Manage your tasks smarter, not harder with AI-powered scheduling and organization.',
  keywords: 'task management, productivity, AI scheduling, task organization, todo app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
} 