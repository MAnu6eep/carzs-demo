'use client';

import { useState, useEffect } from 'react';

export default function AdminSellLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await fetch('/api/sell-car');
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/sell-car/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchLeads();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Sell-Your-Car Leads Pipeline</h1>
        <p className="text-xs text-slate-500">Valuation requests submitted by car sellers</p>
      </div>

      <div data-component-id="ADMIN-010" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        {loading ? (
          <div className="text-xs text-slate-400">Loading valuation leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-6">No sell leads submitted.</div>
        ) : (
          <div className="space-y-4">
            {leads.map(lead => (
              <div key={lead.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{lead.customerName} ({lead.customerPhone})</span>
                  <span className="px-2.5 py-0.5 bg-cyan-100 text-cyan-800 font-extrabold uppercase rounded-full text-[10px]">
                    {lead.status}
                  </span>
                </div>
                <div className="text-slate-700 font-semibold">
                  Vehicle: {lead.year} {lead.brand} {lead.model} ({lead.fuelType}, {lead.transmission}) • {lead.kmDriven.toLocaleString()} km
                </div>
                <div className="text-slate-500">City: {lead.city} | Email: {lead.customerEmail}</div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => updateStatus(lead.id, 'IN_PROGRESS')}
                    className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-[11px]"
                  >
                    Set In-Progress
                  </button>
                  <button
                    onClick={() => updateStatus(lead.id, 'EVALUATED')}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px]"
                  >
                    Mark Evaluated & Paid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
