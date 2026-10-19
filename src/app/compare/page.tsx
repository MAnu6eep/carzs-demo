'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GitCompare, Plus, X, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { formatPrice, formatKm, calculateEMI } from '@/lib/utils';

export default function ComparePage() {
  const [availableCars, setAvailableCars] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparedCars, setComparedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(data => {
        const list = data.cars || [];
        setAvailableCars(list);
        if (list.length >= 2) {
          setSelectedIds([list[0].id, list[1].id]);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setComparedCars([]);
      return;
    }

    setLoading(true);
    fetch(`/api/cars/compare?ids=${selectedIds.join(',')}`)
      .then(res => res.json())
      .then(data => {
        setComparedCars(data.cars || []);
      })
      .finally(() => setLoading(false));
  }, [selectedIds]);

  const addCarToCompare = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCarFromCompare = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div data-component-id="COMP-001" className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
          <GitCompare className="w-3.5 h-3.5" /> Side-by-Side Car Comparison Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Compare Vehicle Specifications</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Compare up to 3 cars on pricing, inspection scores, fuel efficiency, engine specs, and features.
        </p>
      </div>

      {/* Car Selector Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map(slotIndex => {
          const car = comparedCars[slotIndex];

          return (
            <div key={slotIndex} data-component-id="COMP-002" className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              {car ? (
                <div className="space-y-3 relative">
                  <button
                    onClick={() => removeCarFromCompare(car.id)}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-all z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden">
                    <Image
                      src={car.images && car.images.length > 0 ? car.images[0].url : '/images/cars/car-photo-1.jpeg'}
                      alt={car.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{car.year} {car.brand} {car.model}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{car.variant}</p>
                    <div className="text-lg font-extrabold text-blue-600 mt-1">{formatPrice(car.price)}</div>
                  </div>
                </div>
              ) : (
                <div className="py-12 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-700">Add Vehicle #{slotIndex + 1}</div>
                  
                  <select
                    data-component-id="COMP-003"
                    onChange={e => e.target.value && addCarToCompare(e.target.value)}
                    value=""
                    className="mx-auto block px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <option value="">Select Car to Compare...</option>
                    {availableCars
                      .filter(c => !selectedIds.includes(c.id))
                      .map(c => (
                        <option key={c.id} value={c.id}>
                          {c.year} {c.brand} {c.model} - {formatPrice(c.price)}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Specs Comparison Table */}
      {comparedCars.length > 0 && (
        <div data-component-id="COMP-004" className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-900 text-white font-extrabold text-base">
            Detailed Feature & Spec Comparison Matrix
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            
            {/* Price */}
            <div className="grid grid-cols-4 p-4 items-center bg-slate-50 font-bold">
              <div className="text-slate-500 uppercase">Listed Price</div>
              {comparedCars.map(c => (
                <div key={c.id} className="text-blue-600 font-extrabold text-sm">{formatPrice(c.price)}</div>
              ))}
            </div>

            {/* EMI */}
            <div className="grid grid-cols-4 p-4 items-center">
              <div className="text-slate-500 font-medium">Estimated EMI</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-bold text-slate-900">
                  ₹{calculateEMI(c.price).monthlyEMI.toLocaleString('en-IN')}/mo
                </div>
              ))}
            </div>

            {/* Inspection Rating */}
            <div className="grid grid-cols-4 p-4 items-center bg-slate-50 font-bold">
              <div className="text-slate-500 uppercase">Inspection Rating</div>
              {comparedCars.map(c => (
                <div key={c.id} className="text-emerald-600 flex items-center gap-1 font-extrabold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{(c.inspection?.overallScore || 9.2).toFixed(1)} / 10</span>
                </div>
              ))}
            </div>

            {/* Year */}
            <div className="grid grid-cols-4 p-4 items-center">
              <div className="text-slate-500 font-medium">Model Year</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-semibold text-slate-800">{c.year}</div>
              ))}
            </div>

            {/* KM Driven */}
            <div className="grid grid-cols-4 p-4 items-center bg-slate-50">
              <div className="text-slate-500 font-medium">KM Driven</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-semibold text-slate-800">{formatKm(c.kmDriven)}</div>
              ))}
            </div>

            {/* Fuel Type */}
            <div className="grid grid-cols-4 p-4 items-center">
              <div className="text-slate-500 font-medium">Fuel Type</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-semibold text-slate-800">{c.fuelType}</div>
              ))}
            </div>

            {/* Transmission */}
            <div className="grid grid-cols-4 p-4 items-center bg-slate-50">
              <div className="text-slate-500 font-medium">Transmission</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-semibold text-slate-800">{c.transmission}</div>
              ))}
            </div>

            {/* Owners */}
            <div className="grid grid-cols-4 p-4 items-center">
              <div className="text-slate-500 font-medium">Owners</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-semibold text-slate-800">{c.owners} Owner</div>
              ))}
            </div>

            {/* Location */}
            <div className="grid grid-cols-4 p-4 items-center bg-slate-50">
              <div className="text-slate-500 font-medium">Hub Location</div>
              {comparedCars.map(c => (
                <div key={c.id} className="font-semibold text-slate-800">{c.location}</div>
              ))}
            </div>

            {/* View Details CTAs */}
            <div className="grid grid-cols-4 p-4 items-center">
              <div className="text-slate-500 font-bold">Action</div>
              {comparedCars.map(c => (
                <div key={c.id}>
                  <Link
                    href={`/cars/${c.id}`}
                    className="py-2 px-3 bg-blue-600 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 hover:bg-blue-700"
                  >
                    View Car Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
