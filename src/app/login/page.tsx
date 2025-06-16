// src/app/login/page.tsx

'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseBrowserClient'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false); // End loading state

    if (error) {
      setError(error.message); // Show error message if login fails
    } else {
      router.push('/dashboard'); // Redirect to dashboard on successful login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl mb-4 font-semibold">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       <button
  type="submit"
  className="w-full py-2 rounded text-white"
  style={{
    backgroundColor: '#71a3c1',
    opacity: isLoading ? 0.7 : 1,
    cursor: isLoading ? 'not-allowed' : 'pointer',
  }}
  disabled={isLoading}
>
  {isLoading ? 'Logging in...' : 'Login'}
</button>

      </form>
    </div>
  );
}
