'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShieldCheck, MapPin, Gauge, Fuel, Calendar, Cog, ArrowRight } from 'lucide-react';
import { formatPrice, formatKm, calculateEMI } from '@/lib/utils';

interface CarCardProps {
  car: {
    id: string;
    title: string;
    brand: string;
    model: string;
    variant: string;
    year: number;
    price: number;
    kmDriven: number;
    fuelType: string;
    transmission: string;
    location: string;
    status: string;
    isFeatured?: boolean;
    images?: { url: string; isPrimary?: boolean }[];
    inspection?: { overallScore: number } | null;
  };
  isFavourited?: boolean;
  onToggleFavourite?: (carId: string) => void;
}

export default function CarCard({ car, isFavourited = false, onToggleFavourite }: CarCardProps) {
  const [fav, setFav] = useState(isFavourited);
  const [loadingFav, setLoadingFav] = useState(false);

  const primaryImage = car.images && car.images.length > 0
    ? (car.images.find(img => img.isPrimary)?.url || car.images[0].url)
    : '/images/cars/car-photo-1.jpeg';

  const emiData = calculateEMI(car.price);
  const inspectionScore = car.inspection?.overallScore || 9.1;

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onToggleFavourite) {
      onToggleFavourite(car.id);
      return;
    }

    setLoadingFav(true);
    try {
      const res = await fetch('/api/favourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: car.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setFav(data.favourited);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFav(false);
    }
  };

  return (
    <div data-component-id="CARD-001" className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col h-full relative">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <Image
          data-component-id="CARD-002"
          src={primaryImage}
          alt={car.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span data-component-id="CARD-003" className="px-2.5 py-1 text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 rounded-full shadow-sm flex items-center gap-1 border border-slate-200/50">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{inspectionScore.toFixed(1)} Inspected</span>
          </span>
          {car.isFeatured && (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-white rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Heart Favourite Button */}
        <button
          onClick={handleHeartClick}
          disabled={loadingFav}
          data-component-id="CARD-004"
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-md text-slate-600 hover:text-rose-600 rounded-full shadow-md transition-all z-10"
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Status Overlay if not AVAILABLE */}
        {car.status !== 'AVAILABLE' && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-amber-500 text-white rounded-full shadow-lg">
              {car.status}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <div data-component-id="CARD-005" className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
              {car.year} {car.brand} {car.model}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-3 line-clamp-1 font-medium">
            {car.variant}
          </p>

          {/* Quick Specs Pill Row */}
          <div data-component-id="CARD-006" className="grid grid-cols-3 gap-1.5 py-2.5 px-3 bg-slate-50 rounded-xl mb-4 text-slate-600 text-[11px] font-medium border border-slate-100">
            <div className="flex items-center gap-1.5 truncate">
              <Gauge className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{formatKm(car.kmDriven)}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Cog className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{car.transmission}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div data-component-id="CARD-007" className="text-xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(car.price)}
              </div>
              <div data-component-id="CARD-008" className="text-[11px] text-blue-600 font-semibold">
                EMI from ₹{emiData.monthlyEMI.toLocaleString('en-IN')}/mo
              </div>
            </div>

            <div data-component-id="CARD-009" className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.location}</span>
            </div>
          </div>

          <Link
            href={`/cars/${car.id}`}
            data-component-id="CARD-010"
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
