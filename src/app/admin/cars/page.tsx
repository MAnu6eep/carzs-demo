'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit3, Trash2, ShieldCheck, Search, Filter } from 'lucide-react';
import { formatPrice, formatKm } from '@/lib/utils';

export default function AdminCarsPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCars = async () => {
    setLoading(true);
    const res = await fetch(`/api/cars?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    setCars(data.cars || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, [search]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'AVAILABLE' ? 'RESERVED' : currentStatus === 'RESERVED' ? 'SOLD' : 'AVAILABLE';
    await fetch(`/api/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    });
    fetchCars();
  };

  const deleteCar = async (id: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    await fetch(`/api/cars/${id}`, { method: 'DELETE' });
    fetchCars();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Car Inventory</h1>
          <p className="text-xs text-slate-500">Create, edit, change status, and update inspection reports</p>
        </div>

        <Link
          href="/admin/cars/new"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* Table Box */}
      <div data-component-id="ADMIN-005" className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-4">
        
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Vehicle Details</th>
                <th className="p-3">Price</th>
                <th className="p-3">KM / Specs</th>
                <th className="p-3">Inspection</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center text-slate-400">Loading inventory...</td></tr>
              ) : cars.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-slate-400">No cars found.</td></tr>
              ) : (
                cars.map(car => {
                  const img = car.images && car.images.length > 0 ? car.images[0].url : '/images/cars/car-photo-1.jpeg';
                  return (
                    <tr key={car.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            <Image src={img} alt={car.title} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900">{car.year} {car.brand} {car.model}</div>
                            <div className="text-[11px] text-slate-400">{car.variant}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-extrabold text-slate-900">
                        {formatPrice(car.price)}
                      </td>

                      <td className="p-3 text-slate-600">
                        {formatKm(car.kmDriven)} • {car.fuelType} • {car.transmission}
                      </td>

                      <td className="p-3">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-md flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3.5 h-3.5" /> {(car.inspection?.overallScore || 9.2).toFixed(1)} / 10
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          data-component-id="ADMIN-006"
                          onClick={() => toggleStatus(car.id, car.status)}
                          className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full uppercase ${
                            car.status === 'AVAILABLE'
                              ? 'bg-emerald-100 text-emerald-800'
                              : car.status === 'RESERVED'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {car.status} ↺
                        </button>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/cars/${car.id}/edit`}
                            className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg"
                            title="Edit Car"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteCar(car.id)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg"
                            title="Delete Car"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
