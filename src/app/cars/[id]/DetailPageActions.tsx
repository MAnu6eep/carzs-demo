'use client';

import { useState } from 'react';
import TestDriveModal from '@/components/TestDriveModal';
import EnquiryModal from '@/components/EnquiryModal';
import { Calendar, PhoneCall, MessageSquare, Heart } from 'lucide-react';

interface DetailPageActionsProps {
  car: {
    id: string;
    title: string;
    location: string;
  };
}

export default function DetailPageActions({ car }: DetailPageActionsProps) {
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [favourited, setFavourited] = useState(false);

  const toggleFav = async () => {
    try {
      const res = await fetch('/api/favourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: car.id }),
      });
      const data = await res.json();
      if (res.ok) setFavourited(data.favourited);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-3">
      
      <button
        data-component-id="ACT-001"
        onClick={() => setTestDriveOpen(true)}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Free Test Drive</span>
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button
          data-component-id="ACT-002"
          onClick={() => setEnquiryOpen(true)}
          className="py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
        >
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <span>Get Callback</span>
        </button>

        <button
          data-component-id="ACT-003"
          onClick={() => setEnquiryOpen(true)}
          className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>Make Offer</span>
        </button>
      </div>

      <button
        data-component-id="ACT-004"
        onClick={toggleFav}
        className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
          favourited
            ? 'bg-rose-50 text-rose-600 border-rose-200'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
        }`}
      >
        <Heart className={`w-4 h-4 ${favourited ? 'fill-rose-600 text-rose-600' : ''}`} />
        <span>{favourited ? 'Saved in Favourites' : 'Add to Wishlist'}</span>
      </button>

      {/* Modals */}
      <TestDriveModal
        car={car}
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
      />

      <EnquiryModal
        car={car}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

    </div>
  );
}
