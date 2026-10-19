'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';

export default function AccountFavouritesPage() {
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/favourites')
      .then(res => res.json())
      .then(data => {
        setFavourites(data.favourites || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-component-id="ACC-004" className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Saved Wishlist Favourites</h1>
        <p className="text-xs text-slate-500">Cars you saved for price alerts & comparison</p>
      </div>

      {loading ? (
        <div className="text-xs text-slate-500">Loading saved cars...</div>
      ) : favourites.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
          No favourite cars saved yet. Click the heart icon on any car to save it here!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map(fav => (
            <CarCard key={fav.id} car={fav.car} isFavourited={true} />
          ))}
        </div>
      )}
    </div>
  );
}
