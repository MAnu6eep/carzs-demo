import Link from 'next/link';
import Image from 'next/image';
import { Search, ShieldCheck, Car, Calendar, Fuel, Award, ArrowRight, RotateCcw, CheckCircle2, ChevronRight, Sparkles, PhoneCall, Wallet } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CarCard from '@/components/CarCard';

async function getHomepageCars() {
  try {
    const featuredCars = await prisma.car.findMany({
      where: { status: 'AVAILABLE' },
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        inspection: true,
      },
    });
    return featuredCars;
  } catch (e) {
    return [];
  }
}

export default async function HomePage() {
  const cars = await getHomepageCars();

  const brands = [
    { name: 'Hyundai', count: '142 Cars', logo: '🚗' },
    { name: 'Maruti Suzuki', count: '198 Cars', logo: '🏎️' },
    { name: 'Tata', count: '115 Cars', logo: '🚘' },
    { name: 'Mahindra', count: '89 Cars', logo: '🚙' },
    { name: 'Kia', count: '64 Cars', logo: '🚘' },
    { name: 'Toyota', count: '52 Cars', logo: '🏎️' },
    { name: 'Honda', count: '78 Cars', logo: '🚗' },
    { name: 'Volkswagen', count: '41 Cars', logo: '🚙' },
  ];

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '200+ Point Inspection',
      desc: 'Every car undergoes a rigorous multi-stage mechanical & structural quality inspection by certified automotive engineers.',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      icon: RotateCcw,
      title: '5-Day Moneyback Guarantee',
      desc: 'Test drive your life. If you are not completely satisfied with your purchase, return the car within 5 days for a 100% full refund.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: Wallet,
      title: 'Transparent Pricing & EMI',
      desc: 'Zero hidden dealership fees or middleman commissions. Fixed fair market pricing with instant loan approval starting at 9.5% interest.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Award,
      title: '1-Year Warranty Included',
      desc: 'Drive with total peace of mind. Comprehensive 12-month engine & transmission warranty included on all certified pre-owned vehicles.',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
  ];

  const reviews = [
    {
      name: 'Vikram Malhotra',
      city: 'Bangalore',
      car: 'Hyundai Creta SX 2023',
      rating: 5,
      comment: 'Buying my Creta through AutoNest was smoother than buying a new phone. The 200 point inspection report gave me 100% confidence!',
    },
    {
      name: 'Priya Sundaram',
      city: 'Hyderabad',
      car: 'Kia Seltos GTX+ 2022',
      rating: 5,
      comment: 'Sold my old Swift and upgraded to a Seltos within 48 hours. Valuation was higher than local dealers and payment was instant.',
    },
    {
      name: 'Anand Verma',
      city: 'Mumbai',
      car: 'Tata Nexon EV 2023',
      rating: 5,
      comment: 'Top notch transparent service. The doorstep test drive was on time and the loan documentation was processed in just 3 hours!',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section data-component-id="HERO-001" className="relative gradient-hero text-white overflow-hidden py-16 sm:py-24">
        {/* Background Subtle Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div data-component-id="HERO-002" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>India's Premium Inspected Used Car Marketplace</span>
              </div>

              <h1 data-component-id="HERO-003" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Find a car you'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">love with trust.</span>
              </h1>

              <p data-component-id="HERO-004" className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                Quality inspected pre-owned cars with transparent pricing, 200+ point mechanical certification, 5-day moneyback guarantee, and a simple buying experience.
              </p>

              {/* Quick Trust Highlights */}
              <div data-component-id="HERO-005" className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-800 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>200+ Pt Inspection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>5-Day Moneyback</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-Yr Warranty</span>
                </div>
              </div>
            </div>

            {/* Hero Search Box Card */}
            <div data-component-id="SEARCH-001" className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">Search Used Cars</h2>
              <p className="text-xs text-slate-500 mb-6">Filter through certified pre-owned inventory in your city</p>

              <form action="/cars" method="GET" className="space-y-4">
                
                {/* Brand */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Make</label>
                  <select
                    name="brand"
                    data-component-id="SEARCH-002"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Brands</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Tata">Tata</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Kia">Kia</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Volkswagen">Volkswagen</option>
                  </select>
                </div>

                {/* Body Type & Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Body Type</label>
                    <select
                      name="bodyType"
                      data-component-id="SEARCH-003"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Types</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Hatchback">Hatchback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Max Price</label>
                    <select
                      name="maxPrice"
                      data-component-id="SEARCH-004"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Any Price</option>
                      <option value="800000">Under ₹8 Lakh</option>
                      <option value="1200000">Under ₹12 Lakh</option>
                      <option value="1800000">Under ₹18 Lakh</option>
                      <option value="2500000">Under ₹25 Lakh</option>
                    </select>
                  </div>
                </div>

                {/* Fuel & Transmission */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
                    <select
                      name="fuelType"
                      data-component-id="SEARCH-005"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All Fuels</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Transmission</label>
                    <select
                      name="transmission"
                      data-component-id="SEARCH-006"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  data-component-id="SEARCH-007"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Explore Available Cars</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Grid Section */}
      <section data-component-id="BRAND-001" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore by Popular Brand</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Certified pre-owned cars from top automotive manufacturers</p>
          </div>
          <Link href="/cars" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All Brands <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map(b => (
            <Link
              key={b.name}
              href={`/cars?brand=${encodeURIComponent(b.name)}`}
              data-component-id="BRAND-002"
              className="bg-white rounded-2xl p-4 border border-slate-200 text-center hover:border-blue-500 hover:shadow-md transition-all group flex flex-col items-center justify-center"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{b.logo}</div>
              <div className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600">{b.name}</div>
              <div className="text-[10px] text-slate-400 font-medium">{b.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
              Handpicked Stock
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Pre-Owned Vehicles</h2>
          </div>
          <Link href="/cars" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Browse All Cars ({cars.length}+) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.slice(0, 6).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Trust Pillars Banner */}
      <section data-component-id="TRUST-001" className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Why AutoNest
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">The AutoNest Trust Guarantee</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              We eliminated the stress and opacity from buying a pre-owned vehicle with benchmark inspection standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((p, idx) => {
              const Icon = p.icon;
              const trustId = `TRUST-00${idx + 2}`;
              return (
                <div key={idx} data-component-id={trustId} className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/50 space-y-4 hover:border-slate-600 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${p.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section data-component-id="HOW-001" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">How Buying a Car Works</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">4 simple steps to driving your dream car home</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'Find Your Car', desc: 'Browse 200+ certified cars with 360 photos & full inspection scores online.' },
            { step: '02', title: 'Book a Test Drive', desc: 'Schedule a free test drive at our nearest hub or right at your doorstep.' },
            { step: '03', title: 'Easy Paperwork', desc: 'Get instant loan approval, RC transfer assistance, and 1-year warranty registration.' },
            { step: '04', title: 'Home Delivery', desc: 'Take delivery of your fully detailed, sanitized car with 5-day moneyback guarantee.' }
          ].map((item, index) => (
            <div key={index} data-component-id="HOW-002" className="bg-white p-6 rounded-2xl border border-slate-200 relative group hover:shadow-md transition-all">
              <div className="text-4xl font-extrabold text-blue-600/20 group-hover:text-blue-600 transition-colors mb-3">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sell Your Car Banner CTA */}
      <section data-component-id="SELL-001" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Want to Sell or Upgrade?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Sell Your Car in 1 Hour with Instant Bank Transfer
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Get an instant online price valuation, free doorstep evaluation, hassle-free RC transfer, and instant payment directly to your bank account.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/sell-your-car"
                className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-extrabold shadow-lg transition-all flex items-center gap-2"
              >
                <span>Get Free Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs font-semibold text-blue-100">
                ⚡ Over 25,000+ happy car sellers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section data-component-id="REV-001" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">What Our Buyers Say</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Real stories from verified AutoNest owners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} data-component-id="REV-002" className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <div className="flex text-amber-400 text-xs">
                {'★'.repeat(rev.rating)}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.comment}"</p>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.name}</div>
                  <div className="text-[11px] text-slate-400">{rev.city}</div>
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md">
                  {rev.car}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
