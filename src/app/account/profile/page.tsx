'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export default function AccountProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  if (!user) {
    return <div className="text-xs text-slate-500">Loading user profile...</div>;
  }

  return (
    <div data-component-id="ACC-003" className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Personal Profile</h1>
        <p className="text-xs text-slate-500">Your verified AutoNest membership profile details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-500" /> Full Name
          </div>
          <div className="text-sm font-extrabold text-slate-900">{user.name}</div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-500" /> Email Address
          </div>
          <div className="text-sm font-extrabold text-slate-900">{user.email}</div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone Number
          </div>
          <div className="text-sm font-extrabold text-slate-900">{user.phone || '+91 98123 45678'}</div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Role & Membership
          </div>
          <div className="text-sm font-extrabold text-emerald-600 uppercase">{user.role} Verified</div>
        </div>
      </div>
    </div>
  );
}
