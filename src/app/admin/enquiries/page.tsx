'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await fetch('/api/enquiries');
    const data = await res.json();
    setEnquiries(data.enquiries || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchEnquiries();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Customer Callback Enquiries</h1>
        <p className="text-xs text-slate-500">Track and respond to buyer offer & callback leads</p>
      </div>

      <div data-component-id="ADMIN-009" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        {loading ? (
          <div className="text-xs text-slate-400">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-6">No customer enquiries found.</div>
        ) : (
          <div className="space-y-4">
            {enquiries.map(e => (
              <div key={e.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{e.customerName} ({e.customerPhone})</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-extrabold uppercase rounded-full text-[10px]">
                    {e.status}
                  </span>
                </div>
                <div className="text-slate-600">
                  Target Car: <Link href={`/cars/${e.carId}`} className="text-blue-600 font-bold hover:underline">{e.car?.title}</Link>
                </div>
                <p className="text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200">"{e.message}"</p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => updateStatus(e.id, 'CONTACTED')}
                    className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-[11px]"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(e.id, 'CONVERTED')}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px]"
                  >
                    Mark Converted
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
