'use client';

import { useState, useEffect } from 'react';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Registered Customer Directory</h1>
        <p className="text-xs text-slate-500">Verified AutoNest buyer & seller accounts</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-xs text-slate-600 space-y-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900 text-sm">Rahul Sharma (demo@autonest.com)</div>
            <div className="text-slate-500">Phone: +91 98123 45678 | Joined: Oct 2026</div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">ACTIVE CUSTOMER</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900 text-sm">AutoNest Admin (admin@autonest.com)</div>
            <div className="text-slate-500">Phone: +91 98765 43210 | Joined: Oct 2026</div>
          </div>
          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">ADMINISTRATOR</span>
        </div>
      </div>
    </div>
  );
}
