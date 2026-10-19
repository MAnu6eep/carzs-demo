'use client';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dealership System Settings</h1>
        <p className="text-xs text-slate-500">Configure marketplace brand name, hub addresses & financing API credentials</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-xs text-slate-700 space-y-4">
        <div>
          <label className="block font-bold mb-1">Dealership Platform Brand Name</label>
          <input
            type="text"
            readOnly
            value="AutoNest Motors"
            className="w-full max-w-md px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Primary Dealership Hub City</label>
          <input
            type="text"
            readOnly
            value="Bangalore & Hyderabad Hubs"
            className="w-full max-w-md px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
