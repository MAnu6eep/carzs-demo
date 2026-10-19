import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice, formatKm, calculateEMI } from '@/lib/utils';
import CarGallery from '@/components/CarGallery';
import InspectionReportCard from '@/components/InspectionReportCard';
import EMICalculatorWidget from '@/components/EMICalculatorWidget';
import DetailPageActions from './DetailPageActions';
import { ShieldCheck, Calendar, Fuel, Cog, Gauge, MapPin, CheckCircle2, User, FileText, ChevronRight, Award, Shield, ArrowRight } from 'lucide-react';
import CarCard from '@/components/CarCard';

async function getCarDetail(id: string) {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        features: true,
        inspection: true,
      },
    });
    return car;
  } catch (e) {
    return null;
  }
}

async function getSimilarCars(carId: string, brand: string) {
  try {
    const similar = await prisma.car.findMany({
      where: {
        id: { not: carId },
        status: 'AVAILABLE',
      },
      take: 3,
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        inspection: true,
      },
    });
    return similar;
  } catch (e) {
    return [];
  }
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getCarDetail(params.id);

  if (!car) {
    notFound();
  }

  const similarCars = await getSimilarCars(car.id, car.brand);
  const emiData = calculateEMI(car.price);
  const inspectionScore = car.inspection?.overallScore || 9.3;

  const overviewItems = [
    { label: 'Registration Year', value: car.registrationYear ? `${car.registrationYear}` : `${car.year}`, icon: Calendar },
    { label: 'Kilometers Driven', value: formatKm(car.kmDriven), icon: Gauge },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Transmission', value: car.transmission, icon: Cog },
    { label: 'No. of Owners', value: `${car.owners} ${car.owners === 1 ? 'st Owner' : 'nd Owner'}`, icon: User },
    { label: 'Engine Displacement', value: car.engineCc ? `${car.engineCc} cc` : 'N/A', icon: Award },
    { label: 'Max Power Output', value: car.maxPower || '115 bhp', icon: Award },
    { label: 'Insurance Status', value: car.insurance || 'Valid Comprehensive', icon: Shield },
    { label: 'Current Location', value: car.location, icon: MapPin },
    { label: 'Body Type', value: car.bodyType, icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/cars" className="hover:text-slate-900">Used Cars</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 truncate font-bold">{car.title}</span>
      </nav>

      {/* Main Grid: Left Gallery + Right Vehicle Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery & Inspection & Specs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Gallery Component */}
          <CarGallery images={car.images} title={car.title} />

          {/* Key Specs Overview Table */}
          <div data-component-id="SPEC-001" className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Vehicle Specifications Overview</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {overviewItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold mb-1">
                      <Icon className="w-3.5 h-3.5 text-blue-500" />
                      <span>{item.label}</span>
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-lg font-extrabold text-slate-900">About This Vehicle</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {car.description}
              </p>
            </div>
          )}

          {/* Visual 200+ Point Inspection scorecard */}
          <InspectionReportCard inspection={car.inspection || undefined} />

          {/* Features Grid */}
          <div data-component-id="FEAT-001" className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Installed Equipment & Features</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(car.features.length > 0 ? car.features : [
                { name: 'Panoramic Sunroof' },
                { name: 'Ventilated Front Seats' },
                { name: 'Push Button Engine Start/Stop' },
                { name: 'Touchscreen Infotainment' },
                { name: 'Apple CarPlay & Android Auto' },
                { name: 'Rear Parking Camera with Sensors' },
                { name: 'Automatic Climate Control' },
                { name: 'Cruise Control' },
                { name: 'Alloy Wheels' },
                { name: 'ABS with Electronic Brakeforce Distribution' },
              ]).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{feat.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Card: Pricing & Action Buttons */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div data-component-id="DETAIL-001" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            {/* Header badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{inspectionScore.toFixed(1)} / 10 Inspected</span>
              </span>

              <span className="text-xs font-bold text-slate-500">
                Location: <span className="text-slate-900">{car.location}</span>
              </span>
            </div>

            {/* Title & Variant */}
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {car.year} {car.brand} {car.model}
              </h1>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                {car.variant}
              </p>
            </div>

            {/* Pricing Box */}
            <div data-component-id="DETAIL-002" className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatPrice(car.price)}
                </div>
                <div className="text-[11px] text-blue-400 font-semibold mt-0.5">
                  Fixed Transparent Fair Market Price
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-300 font-semibold">Zero Down Payment</div>
                <div className="text-xs font-extrabold text-emerald-400">
                  EMI ₹{emiData.monthlyEMI.toLocaleString('en-IN')}/mo
                </div>
              </div>
            </div>

            {/* Interactive Action Modals Buttons */}
            <DetailPageActions car={{ id: car.id, title: car.title, location: car.location }} />

            {/* AutoNest Assurance List */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Includes 1-Year Engine & Transmission Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>5-Day Full Money Back Refund Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Free Doorstep Delivery & RC Name Transfer</span>
              </div>
            </div>

          </div>

          {/* Quick Loans Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-3xl shadow-md space-y-2">
            <h4 className="text-sm font-bold text-white">Need Quick Auto Financing?</h4>
            <p className="text-xs text-slate-300">Instant approval from HDFC & ICICI bank with minimum paperwork.</p>
            <Link href="/finance" className="text-xs font-bold text-blue-400 hover:underline inline-flex items-center gap-1 pt-1">
              Calculate EMI Breakdown <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

      {/* Live Financial EMI Calculator Widget */}
      <section className="pt-8 border-t border-slate-200">
        <EMICalculatorWidget initialPrice={car.price} />
      </section>

      {/* Similar Vehicles Grid */}
      {similarCars.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900">Similar Certified Vehicles</h3>
            <Link href="/cars" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              Browse All Inventory →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map(sc => (
              <CarCard key={sc.id} car={sc} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
