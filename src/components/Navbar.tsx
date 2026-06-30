'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FiMenu, FiX, FiMoon, FiSun, FiBell } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <span className="text-2xl">💳</span>
            PPOB Enterprise
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {session ? (
              <>
                <Link href="/dashboard" className="text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  Dashboard
                </Link>
                <button className="text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  <FiBell className="text-xl" />
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  {isDark ? <FiSun /> : <FiMoon />}
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {session ? (
              <>
                <Link href="/dashboard" className="block px-4 py-2 text-slate-700">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 text-slate-700">
                  Masuk
                </Link>
                <Link href="/register" className="block px-4 py-2 text-blue-600 font-semibold">
                  Daftar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
