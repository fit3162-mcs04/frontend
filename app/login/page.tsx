'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface User {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;

    if (isRegistering) {
      // Save new user to localStorage (simple demo, replace with real API in production)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const userExists = existingUsers.find(user => user.username === username);

      if (userExists) {
        setMessage('Username already exists. Please choose another.');
      } else {
        const newUsers = [...existingUsers, { username, password }];
        localStorage.setItem('users', JSON.stringify(newUsers));
        setMessage('Registration successful! You can now log in.');
        setIsRegistering(false);
        setUsername('');
        setPassword('');
      }
    } else {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const found = existingUsers.find(
        user => user.username === username && user.password === password
      );

      if (found) {
        router.push('/upload');
      } else {
        setMessage('Invalid credentials. Try again or register.');
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-black text-gray-800 dark:text-white">
      <Image src="/dna-logo.svg" width={60} height={60} alt="Logo" className="mb-4" />
      <h1 className="text-2xl font-bold mb-2">
        {isRegistering ? 'Create a New Account' : 'User Login'}
      </h1>
      <h2 className="text-sm text-gray-500 dark:text-gray-300 mb-4">
        Genetic Stroke Risk Prediction
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        {message && <p className="text-sm text-center text-red-600 dark:text-red-400">{message}</p>}
        <p className="text-sm text-center">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage('');
            }}
            className="text-blue-600 underline"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </main>
  );
}