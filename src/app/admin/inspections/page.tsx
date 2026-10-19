'use client';

import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminInspectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">200+ Point Inspection Report Manager</h1>
        <p className="text-xs text-slate-500">Configure vehicle mechanical scorecards & certification checklist</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 text-xs">
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <div className="font-extrabold text-sm">Automated Inspection Rating Engine Active</div>
            <p className="text-[11px] text-emerald-800">All 16 seeded vehicles have verified 200+ point multi-stage inspection certificates attached.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
