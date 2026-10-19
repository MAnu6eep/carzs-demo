'use client';

import { useState, useEffect } from 'react';
import { Car, Calendar, MessageSquare, DollarSign, Users, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return <div className="text-xs text-slate-500">Loading admin metrics...</div>;
  }

  const { stats, fuelBreakdown, brandBreakdown } = data;

  const metricCards = [
    { title: 'Total Vehicles', value: stats.totalCars, icon: Car, color: 'bg-blue-500' },
    { title: 'Available in Stock', value: stats.availableCars, icon: CheckCircle2, color: 'bg-emerald-500' },
    { title: 'Reserved Vehicles', value: stats.reservedCars, icon: Calendar, color: 'bg-amber-500' },
    { title: 'Sold Vehicles', value: stats.soldCars, icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'New Enquiries', value: stats.newEnquiries, icon: MessageSquare, color: 'bg-rose-500' },
    { title: 'Upcoming Test Drives', value: stats.upcomingBookings, icon: Calendar, color: 'bg-indigo-500' },
    { title: 'Sell-Car Leads', value: stats.newSellLeads, icon: DollarSign, color: 'bg-cyan-500' },
    { title: 'Registered Customers', value: stats.totalCustomers, icon: Users, color: 'bg-slate-700' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">AutoNest Dealership Dashboard</h1>
        <p className="text-xs text-slate-500">Real-time inventory metrics, customer inquiries & booking analytics</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} data-component-id="ADMIN-002" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500">{card.title}</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">{card.value}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.color} text-white flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Fuel Breakdown */}
        <div data-component-id="ADMIN-003" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Inventory by Fuel Type</h3>
          <div className="space-y-3">
            {fuelBreakdown.map((f: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{f.name}</span>
                  <span>{f.count} Cars</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(f.count / stats.totalCars) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Breakdown */}
        <div data-component-id="ADMIN-004" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Inventory by Brand</h3>
          <div className="space-y-3">
            {brandBreakdown.map((b: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{b.name}</span>
                  <span>{b.count} Cars</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(b.count / stats.totalCars) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
