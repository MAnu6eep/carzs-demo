'use client';

import { ShieldCheck, CheckCircle, AlertCircle, Wrench, ShieldAlert, Sparkles } from 'lucide-react';

interface InspectionReportCardProps {
  inspection?: {
    overallScore: number;
    engineScore: number;
    exteriorScore: number;
    interiorScore: number;
    tyresScore: number;
    brakesScore: number;
    electricalScore: number;
    acScore: number;
    suspensionScore: number;
    summaryNotes?: string | null;
  };
}

export default function InspectionReportCard({ inspection }: InspectionReportCardProps) {
  const data = inspection || {
    overallScore: 9.3,
    engineScore: 9.6,
    exteriorScore: 9.1,
    interiorScore: 9.4,
    tyresScore: 8.9,
    brakesScore: 9.2,
    electricalScore: 9.5,
    acScore: 9.4,
    suspensionScore: 9.1,
    summaryNotes: 'Vehicle passed 200+ point multi-stage inspection with 9.3/10 rating. Non-accidental structure, verified odometer reading, zero flood damage.',
  };

  const categories = [
    { label: 'Engine & Transmission', score: data.engineScore, desc: 'Zero leakage, smooth clutch response, optimal compression' },
    { label: 'Exterior Body & Paint', score: data.exteriorScore, desc: 'Original paint thickness, zero major dents, clear headlight optics' },
    { label: 'Interior & Seats', score: data.interiorScore, desc: 'Clean upholstery, functional dashboard switches, no odor' },
    { label: 'Tyres & Tread Depth', score: data.tyresScore, desc: '75%+ remaining tread depth, balanced alignment' },
    { label: 'Brakes & Discs', score: data.brakesScore, desc: '80%+ brake pad life, responsive ABS sensor test' },
    { label: 'Electrical & Diagnostics', score: data.electricalScore, desc: 'Zero OBD fault codes, functional alternator & battery' },
    { label: 'Air Conditioning', score: data.acScore, desc: 'Cooling at 4°C vent temp, new cabin air filter' },
    { label: 'Suspension & Steering', score: data.suspensionScore, desc: 'Zero noise over speed breakers, tight rack response' },
  ];

  const trustChecklist = [
    'Non-Accidental Frame Certified',
    'Zero Flood or Submersion Damage',
    'Verified Odometer History',
    'Clean Service & Ownership Records',
    'No Pending Police Challans or Litigations',
    '5-Day Full Money Back Guarantee Eligible',
  ];

  return (
    <div data-component-id="INSP-001" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      
      {/* Overall Score Banner */}
      <div data-component-id="INSP-002" className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white rounded-md">
                Certified Pre-Owned
              </span>
              <span className="text-xs text-slate-400 font-medium">200+ Point Multi-Stage Inspection</span>
            </div>
            <h4 className="text-xl font-extrabold text-white mt-1">AutoNest Trust Inspection Certificate</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {data.summaryNotes}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 shrink-0 min-w-[130px]">
          <div className="text-3xl font-extrabold text-blue-400">
            {data.overallScore.toFixed(1)} <span className="text-sm text-slate-400">/ 10</span>
          </div>
          <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider mt-0.5">
            Overall Rating
          </div>
        </div>
      </div>

      {/* Grid of Scores */}
      <div data-component-id="INSP-003" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{cat.label}</span>
              <span className="text-xs font-extrabold text-blue-600">{cat.score.toFixed(1)} / 10</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(cat.score / 10) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust Checklist Badges */}
      <div data-component-id="INSP-004" className="pt-4 border-t border-slate-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Guaranteed Quality Certifications
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {trustChecklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-emerald-50/70 text-emerald-950 p-2.5 rounded-xl border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
