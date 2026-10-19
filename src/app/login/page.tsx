'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Car, Lock, Mail, ShieldCheck, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/account/profile');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@autonest.com');
      setPassword('admin123');
    } else {
      setEmail('demo@autonest.com');
      setPassword('demo123');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Car className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back to AutoNest</h1>
        <p className="text-xs text-slate-500">Sign in to view saved favourites, bookings & enquiries</p>
      </div>

      {/* Quick Demo Autofill Bar */}
      <div data-component-id="AUTH-002" className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-2 text-xs">
        <div className="font-bold text-amber-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Quick Demo Login Shortcut:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemo('customer')}
            className="py-1.5 px-2 bg-white text-slate-800 rounded-lg font-bold border border-amber-200 hover:bg-amber-100/50 text-[11px]"
          >
            Fill Customer Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemo('admin')}
            className="py-1.5 px-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 text-[11px]"
          >
            Fill Admin Demo
          </button>
        </div>
      </div>

      <div data-component-id="AUTH-001" className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            data-component-id="AUTH-003"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>

    </div>
  );
}
