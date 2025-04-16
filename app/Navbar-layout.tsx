'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('users');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-blue-600 hover:underline">
            About
          </Link>
          {isLoggedIn && (
            <Link href="/upload" className="text-blue-600 hover:underline">
              Upload
            </Link>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-600 hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          )}
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
