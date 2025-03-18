import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user's preference
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true' || 
                    (!localStorage.getItem('darkMode') && 
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(isDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newMode.toString());
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Close user menu when opening main menu
    if (!isMenuOpen) {
      setIsUserMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    
    // Close main menu when opening user menu
    if (!isUserMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm dark:border-gray-800 dark:bg-dark-200 dark:bg-opacity-90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary-500 to-primary-700"></div>
              <span className="relative flex h-full w-full items-center justify-center font-bold text-white">TF</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/tasks" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                Tasks
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                Calendar
              </Link>
            </li>
            <li>
              <Link href="/reports" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                Reports
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-100"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </button>

          {/* User Menu (Desktop) */}
          {session ? (
            <div className="relative hidden md:block">
              <button
                className="flex items-center space-x-2 rounded-full focus:outline-none"
                onClick={toggleUserMenu}
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-dark-100">
                  <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                    <p className="font-medium text-gray-900 dark:text-white">{session.user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                  </div>
                  <Link href="/profile" className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-200">
                    <FiUser className="mr-2 h-4 w-4" /> Profile
                  </Link>
                  <Link href="/settings" className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-200">
                    <FiSettings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-200"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="hidden md:block">
              <button className="btn-primary">Sign In</button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-100 md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-dark-200 md:hidden">
          <nav className="container mx-auto px-4 py-2">
            <ul className="space-y-4 py-2">
              <li>
                <Link 
                  href="/"
                  className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/tasks"
                  className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link 
                  href="/calendar"
                  className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link 
                  href="/reports"
                  className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reports
                </Link>
              </li>
            </ul>

            {session ? (
              <div className="border-t border-gray-200 py-4 dark:border-gray-700">
                <div className="flex items-center space-x-3 py-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{session.user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                  </div>
                </div>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link 
                      href="/profile"
                      className="flex items-center py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="mr-2 h-5 w-5" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/settings"
                      className="flex items-center py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiSettings className="mr-2 h-5 w-5" /> Settings
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleSignOut}
                      className="flex w-full items-center py-2 text-left text-red-600"
                    >
                      <FiLogOut className="mr-2 h-5 w-5" /> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="border-t border-gray-200 py-4 dark:border-gray-700">
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  <button className="btn-primary w-full">Sign In</button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 