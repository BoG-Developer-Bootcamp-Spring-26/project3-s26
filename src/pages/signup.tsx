import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ fullName, email, password, admin }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/'); 
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border p-2 rounded w-full" 
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full" 
            required
          />
          <input 
            type="password" 
            placeholder="Choose a Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full" 
            required
          />
          
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 rounded w-full" 
            required
          />
          
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              className="w-4 h-4"
            />
            Register as Admin
          </label>

          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition disabled:bg-green-400"
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/" className="text-blue-600 hover:underline font-semibold">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}