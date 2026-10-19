'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Car } from 'lucide-react';
import Link from 'next/link';

export default function AccountTestDrivesPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data.bookings || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-component-id="ACC-005" className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Test Drive Bookings</h1>
        <p className="text-xs text-slate-500">Track your scheduled hub & doorstep test drives</p>
      </div>

      {loading ? (
        <div className="text-xs text-slate-500">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
          No test drives booked yet. Browse cars and click "Book Free Test Drive".
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase rounded-full">
                    {b.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {b.id.substring(0, 8)}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  <Link href={`/cars/${b.carId}`} className="hover:text-blue-600">
                    {b.car?.title || 'Vehicle Test Drive'}
                  </Link>
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-500" /> {b.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-500" /> {b.timeSlot}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {b.location}</span>
                </div>
              </div>

              <Link
                href={`/cars/${b.carId}`}
                className="py-2 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-colors"
              >
                View Vehicle
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
