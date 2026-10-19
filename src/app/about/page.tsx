import { ShieldCheck, Award, Users, CheckCircle2, Car } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">About AutoNest</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Reinventing Used Car Buying in India</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          AutoNest was founded with a single mission: to bring absolute transparency, trust, and simplicity to the pre-owned automobile industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">200+ Point Inspection</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Every car undergoes rigorous mechanical, body structure, electrical, and OBD scanner checks before listing.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Fixed Transparent Price</h3>
          <p className="text-xs text-slate-500 leading-relaxed">No high margin middleman markups. Fair market pricing backed by real-time valuation data.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">5-Day Return Guarantee</h3>
          <p className="text-xs text-slate-500 leading-relaxed">If you don't love your car, return it within 5 days for a 100% money-back refund with zero hassle.</p>
        </div>
      </div>
    </div>
  );
}
