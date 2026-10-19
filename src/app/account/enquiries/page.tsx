'use client';

import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AccountEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/enquiries')
      .then(res => res.json())
      .then(data => setEnquiries(data.enquiries || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-component-id="ACC-006" className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Submitted Enquiries & Callbacks</h1>
        <p className="text-xs text-slate-500">History of callbacks & price offer enquiries</p>
      </div>

      {loading ? (
        <div className="text-xs text-slate-500">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
          No enquiries submitted yet.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(e => (
            <div key={e.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase rounded-full">
                  {e.status}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                <Link href={`/cars/${e.carId}`} className="hover:text-blue-600">
                  {e.car?.title || 'Vehicle Enquiry'}
                </Link>
              </h3>
              <p className="text-xs text-slate-600 italic">"{e.message}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
