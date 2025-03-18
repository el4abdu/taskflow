"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiSend, FiUser, FiPlus, FiTrash2 } from 'react-icons/fi';
import { BsCpu } from 'react-icons/bs';
import { RiRobot2Line } from 'react-icons/ri';

// Types for our chat messages
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your TaskFlow AI assistant. I can help you manage your tasks, suggest scheduling optimizations, or answer any questions about the app. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'New conversation',
      lastMessage: "Hello! I'm your TaskFlow AI assistant...",
      timestamp: new Date(),
    },
  ]);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if user is authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Mock AI response (in production, this would be a real API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateBotResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Mock AI response generator
  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello there! How can I help you with your tasks today?";
    } else if (input.includes('task') && (input.includes('create') || input.includes('add'))) {
      return "I can help you create a new task! To create a task, go to the Tasks tab in your dashboard and click 'Add New Task'. Or I can create it for you - just tell me the task title, description, and due date.";
    } else if (input.includes('schedule') || input.includes('calendar')) {
      return "Your calendar is looking quite packed this week. I suggest redistributing some of your high-priority tasks to Monday and Wednesday, which are currently less busy.";
    } else if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I understand you're asking about " + userInput + ". Could you provide more details so I can assist you better?";
    }
  };

  // Create a new conversation
  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New conversation',
      lastMessage: '',
      timestamp: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your TaskFlow AI assistant. I can help you manage your tasks, suggest scheduling optimizations, or answer any questions about the app. How can I assist you today?",
        timestamp: new Date(),
      },
    ]);
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 w-80 transform bg-white shadow-lg transition-transform duration-300 dark:bg-dark-100 md:relative md:translate-x-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* New chat button */}
          <div className="p-4">
            <button
              onClick={handleNewConversation}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-white hover:bg-primary-700"
            >
              <FiPlus size={18} />
              <span>New conversation</span>
            </button>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className="group flex cursor-pointer items-center justify-between border-b border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-dark-200"
              >
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {convo.title}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {convo.lastMessage}
                  </p>
                </div>
                <button className="hidden text-gray-400 hover:text-red-500 group-hover:block dark:text-gray-500 dark:hover:text-red-400">
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* User profile */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            {session?.user && (
              <div className="flex items-center">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                    <FiUser size={20} />
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat section */}
      <div className="flex flex-1 flex-col bg-gray-50 dark:bg-dark-200">
        {/* Chat header */}
        <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-dark-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="mr-2 block rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden dark:text-gray-400 dark:hover:bg-dark-300 dark:hover:text-gray-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                  <BsCpu size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                    TaskFlow AI Assistant
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by Google Gemini
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-3/4 rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-800 dark:bg-dark-100 dark:text-white'
                  } shadow`}
                >
                  <div className="flex items-start">
                    {msg.role === 'assistant' && (
                      <div className="mr-2 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                        <RiRobot2Line size={16} />
                      </div>
                    )}
                    <div>
                      <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                      <p className="mt-1 text-right text-xs text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-3/4 rounded-lg bg-white px-4 py-2 shadow dark:bg-dark-100">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                      <RiRobot2Line size={16} />
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-600"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-600" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-600" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat input */}
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-dark-100">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-dark-200 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="rounded-r-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSend size={20} />
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            TaskFlow AI can help with task organization, scheduling, and more.
          </p>
        </div>
      </div>
    </div>
  );
} 