'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseBrowserClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/login'); // Or redirect to dashboard if auto-login enabled
      }
    } catch (err: any) {
      console.error('Signup Error:', err);
      setError('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl mb-4 font-semibold">Sign Up</h2>
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
  {isLoading ? 'Creating account...' : 'Sign Up'}
</button>

      </form>
    </div>
  );
}
