'use client';

import { useState } from 'react';
import { Car, CheckCircle2, ShieldCheck, Zap, Wallet, Phone, Mail, User, MapPin } from 'lucide-react';

export default function SellYourCarPage() {
  const [formData, setFormData] = useState({
    brand: 'Hyundai',
    model: 'Creta',
    variant: 'SX Petrol',
    year: 2022,
    kmDriven: 35000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    owners: 1,
    regLocation: 'Bangalore',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    city: 'Bangalore',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sell-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit valuation');

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-3.5 py-1 bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
            Sell Pre-Owned Car Instant Payment
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Sell Your Car in 3 Easy Steps at the Best Price.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Get an instant online price valuation, free doorstep mechanical evaluation, free RC transfer, and instant bank transfer on the spot.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Container */}
        <div data-component-id="FORM-001" className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900">Enter Vehicle Details for Free Valuation</h2>
            <p className="text-xs text-slate-500">Takes less than 1 minute to get estimated market price offer</p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Valuation Request Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you <span className="font-bold text-slate-900">{formData.customerName}</span>! Our valuation specialist will contact you within 15 minutes to schedule your free doorstep inspection.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              {/* Vehicle Specifications */}
              <div data-component-id="FORM-002" className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">1. Vehicle Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Make</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={e => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Model Name</label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={e => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Model Year</label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">KM Driven</label>
                    <input
                      type="number"
                      required
                      value={formData.kmDriven}
                      onChange={e => setFormData({ ...formData, kmDriven: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
                    <select
                      value={formData.fuelType}
                      onChange={e => setFormData({ ...formData, fuelType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="CNG">CNG</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Owner Contact */}
              <div data-component-id="FORM-003" className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">2. Contact Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Rahul Sharma"
                      value={formData.customerName}
                      onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.customerPhone}
                      onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.customerEmail}
                      onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City Location</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                data-component-id="FORM-004"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all"
              >
                {loading ? 'Calculating Offer...' : 'Get Instant Price Offer'}
              </button>
            </form>
          )}
        </div>

        {/* Right Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-extrabold text-white">Why Sell to AutoNest?</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Instant Bank Transfer</div>
                  <div className="text-slate-300">Payment credited directly to your bank account before handover.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wallet className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Best Price Guarantee</div>
                  <div className="text-slate-300">Up to 15% higher valuation compared to traditional offline car dealers.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Free Hassle-Free RC Transfer</div>
                  <div className="text-slate-300">Complete legal liability protection and official RTO name transfer.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
