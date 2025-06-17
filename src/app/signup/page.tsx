'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('/api/auth/signup', form);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}
