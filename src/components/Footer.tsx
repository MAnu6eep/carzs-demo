import Link from 'next/link';
import { Car, ShieldCheck, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer data-component-id="FOOT-001" className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand info */}
          <div data-component-id="FOOT-002" className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                Auto<span className="text-blue-500">Nest</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              AutoNest is India's most trusted pre-owned car platform. We buy, inspect, certify, and deliver quality inspected pre-owned cars with transparent pricing, 5-day moneyback guarantee, and 1-year warranty.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>200+ Point Multi-Stage Quality Inspection Certificate</span>
            </div>
          </div>

          {/* Quick links */}
          <div data-component-id="FOOT-003">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Top Brands</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cars?brand=Hyundai" className="hover:text-white transition-colors">Used Hyundai Cars</Link></li>
              <li><Link href="/cars?brand=Maruti+Suzuki" className="hover:text-white transition-colors">Used Maruti Suzuki</Link></li>
              <li><Link href="/cars?brand=Tata" className="hover:text-white transition-colors">Used Tata Cars</Link></li>
              <li><Link href="/cars?brand=Mahindra" className="hover:text-white transition-colors">Used Mahindra Cars</Link></li>
              <li><Link href="/cars?brand=Toyota" className="hover:text-white transition-colors">Used Toyota Cars</Link></li>
              <li><Link href="/cars?brand=Kia" className="hover:text-white transition-colors">Used Kia Cars</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div data-component-id="FOOT-004">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Services</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cars" className="hover:text-white transition-colors">Browse Inventory</Link></li>
              <li><Link href="/sell-your-car" className="hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link href="/finance" className="hover:text-white transition-colors">Used Car Loan & EMI</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Car Specs</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Inspection Standards</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Buyer & Seller FAQ</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div data-component-id="FOOT-005">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact Dealership</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+91 1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@autonest.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>AutoNest Hub, MG Road, Electronic City Phase 1, Bangalore, 560100</span>
              </li>
            </ul>
          </div>

        </div>

        <div data-component-id="FOOT-006" className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AutoNest Motors Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/faq" className="hover:text-slate-400">Refund & Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
