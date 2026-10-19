'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminNewCarPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '2023 Hyundai Alcazar Signature 1.5 Diesel',
    brand: 'Hyundai',
    model: 'Alcazar',
    variant: 'Signature 1.5 Diesel AT',
    year: 2023,
    price: 1850000,
    kmDriven: 21000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    location: 'Bangalore',
    color: 'Starry Night',
    registrationYear: 2023,
    engineCc: 1493,
    maxPower: '113 bhp',
    insurance: 'Comprehensive valid till 2027',
    status: 'AVAILABLE',
    isFeatured: true,
    description: 'Pristine 7-seater SUV with panoramic sunroof, 360 camera, Bose audio, and ventilated seats.',
    imageUrls: [
      '/images/cars/car-photo-1.jpeg',
      '/images/cars/car-photo-2.jpeg',
    ],
    features: ['Panoramic Sunroof', 'Ventilated Front Seats', '360 Camera', 'Bose Audio', 'Air Purifier'],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create car');

      router.push('/admin/cars');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center gap-3">
        <Link href="/admin/cars" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-700">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Add New Vehicle to Inventory</h1>
          <p className="text-xs text-slate-500">Specify pricing, vehicle parameters & features</p>
        </div>
      </div>

      <form data-component-id="ADMIN-007" onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Car Listing Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
          />
        </div>

        {/* Brand / Model / Variant */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Make</label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={e => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Model Name</label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={e => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Variant</label>
            <input
              type="text"
              required
              value={formData.variant}
              onChange={e => setFormData({ ...formData, variant: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>
        </div>

        {/* Pricing & KM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹ INR)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Model Year</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">KM Driven</label>
            <input
              type="number"
              required
              value={formData.kmDriven}
              onChange={e => setFormData({ ...formData, kmDriven: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>
        </div>

        {/* Fuel & Transmission */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={e => setFormData({ ...formData, fuelType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Transmission</label>
            <select
              value={formData.transmission}
              onChange={e => setFormData({ ...formData, transmission: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Location City</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Primary Image Path</label>
          <input
            type="text"
            required
            value={formData.imageUrls[0]}
            onChange={e => setFormData({ ...formData, imageUrls: [e.target.value, formData.imageUrls[1]] })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-all"
        >
          {loading ? 'Creating Listing...' : 'Publish Car Listing'}
        </button>
      </form>

    </div>
  );
}
