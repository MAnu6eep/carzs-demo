import EMICalculatorWidget from '@/components/EMICalculatorWidget';
import { Wallet, ShieldCheck, CheckCircle2, Percent, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FinancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
          <Wallet className="w-3.5 h-3.5" /> Used Car Loan & EMI Financial Planner
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Instant Pre-Approved Financing</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Get low interest rates starting from 9.5% p.a. with zero foreclosure charges and flexible loan tenures up to 7 years.
        </p>
      </div>

      {/* Main EMI Calculator Widget */}
      <EMICalculatorWidget initialPrice={1500000} />

      {/* Bank Partners Grid */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900 text-center">Our Banking & Lending Partners</h3>
        <p className="text-xs text-slate-500 text-center max-w-lg mx-auto">
          We partner with India's top financial institutions to guarantee fast approval within 2 hours with minimal documentation.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-bold text-slate-800 text-sm">
          {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India', 'Kotak Mahindra', 'IDFC First Bank', 'Bajaj Finance', 'Tata Capital'].map((bank, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
              <span>{bank}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
