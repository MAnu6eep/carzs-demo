'use client';

import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch('/api/bookings');
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Test Drive Bookings Queue</h1>
        <p className="text-xs text-slate-500">Manage customer test drive schedules & confirm appointments</p>
      </div>

      <div data-component-id="ADMIN-008" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        {loading ? (
          <div className="text-xs text-slate-400">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-6">No test drive bookings found.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                      b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                      b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status}
                    </span>
                    <span className="font-mono text-slate-400">ID: {b.id.substring(0, 8)}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900">{b.customerName}</h3>
                  <div className="text-slate-600 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-blue-500" /> {b.customerPhone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-500" /> {b.customerEmail}</span>
                  </div>

                  <div className="text-slate-700 font-semibold pt-1">
                    Car: <Link href={`/cars/${b.carId}`} className="text-blue-600 font-bold hover:underline">{b.car?.title}</Link>
                  </div>
                  
                  <div className="text-slate-500 flex items-center gap-3 pt-1">
                    <span>📅 {b.date} ({b.timeSlot})</span>
                    <span>📍 {b.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateStatus(b.id, 'CONFIRMED')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, 'COMPLETED')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, 'CANCELLED')}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs rounded-xl"
                  >
                    Cancel
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
