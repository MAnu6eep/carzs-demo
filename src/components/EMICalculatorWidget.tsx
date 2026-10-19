'use client';

import { useState } from 'react';
import { Calculator, Percent, Calendar, IndianRupee, ArrowUpRight } from 'lucide-react';
import { formatPrice, formatPriceFull, calculateEMI } from '@/lib/utils';

interface EMICalculatorWidgetProps {
  initialPrice?: number;
}

export default function EMICalculatorWidget({ initialPrice = 1200000 }: EMICalculatorWidgetProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(5);

  const emi = calculateEMI(price, downPaymentPercent, interestRate, tenureYears);

  return (
    <div data-component-id="EMI-001" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Live Used Car EMI Calculator</h3>
          <p className="text-xs text-slate-500">Calculate customized monthly instalments with flexible tenure & interest rates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Input Section */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Car Price */}
          <div data-component-id="EMI-002">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Car Valuation Price</span>
              <span className="text-sm font-extrabold text-blue-600">{formatPrice(price)} ({formatPriceFull(price)})</span>
            </div>
            <input
              type="range"
              min={200000}
              max={5000000}
              step={25000}
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹2 Lakh</span>
              <span>₹25 Lakh</span>
              <span>₹50 Lakh</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div data-component-id="EMI-003">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-sm font-bold text-slate-900">{formatPrice(emi.downPayment)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPercent}
              onChange={e => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10% (Min)</span>
              <span>40%</span>
              <span>80% (Max)</span>
            </div>
          </div>

          {/* Interest Rate & Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div data-component-id="EMI-004">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="6.5"
                  max="18"
                  value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Percent className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div data-component-id="EMI-005">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Loan Tenure (Years)
              </label>
              <div className="grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5, 7].map(yr => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                      tenureYears === yr
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {yr}Y
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Calculation Result Summary Card */}
        <div data-component-id="EMI-006" className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Estimated Monthly EMI
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 tracking-tight">
              ₹ {emi.monthlyEMI.toLocaleString('en-IN')}
              <span className="text-xs font-medium text-slate-400 ml-1">/ month</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span>Loan Principal Amount:</span>
              <span className="font-bold text-white">₹ {emi.principal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Down Payment Required:</span>
              <span className="font-bold text-emerald-400">₹ {emi.downPayment.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Total Interest Payable:</span>
              <span className="font-bold text-amber-400">₹ {emi.totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800 font-bold text-sm">
              <span className="text-slate-100">Total Amount Payable:</span>
              <span className="text-white">₹ {emi.totalPayment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl text-[11px] text-slate-400 leading-relaxed border border-slate-700/50">
            * Instant pre-approved financing starting at 9.5% with zero forecloser charges from our partner banks (HDFC, ICICI, Axis, SBI).
          </div>
        </div>

      </div>
    </div>
  );
}
