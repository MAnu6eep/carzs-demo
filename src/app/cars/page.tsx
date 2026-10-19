'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, RotateCcw, SlidersHorizontal, ChevronDown, Check, X, ShieldCheck, Car as CarIcon } from 'lucide-react';
import CarCard from '@/components/CarCard';

function CarsListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters state initialized from URL
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || 'All',
    fuelType: searchParams.get('fuelType') || 'All',
    transmission: searchParams.get('transmission') || 'All',
    bodyType: searchParams.get('bodyType') || 'All',
    location: searchParams.get('location') || 'All',
    maxPrice: searchParams.get('maxPrice') || '',
    minYear: searchParams.get('minYear') || '',
    maxKm: searchParams.get('maxKm') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
    search: searchParams.get('search') || '',
  });

  const fetchCars = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    
    if (filters.brand && filters.brand !== 'All') params.set('brand', filters.brand);
    if (filters.fuelType && filters.fuelType !== 'All') params.set('fuelType', filters.fuelType);
    if (filters.transmission && filters.transmission !== 'All') params.set('transmission', filters.transmission);
    if (filters.bodyType && filters.bodyType !== 'All') params.set('bodyType', filters.bodyType);
    if (filters.location && filters.location !== 'All') params.set('location', filters.location);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minYear) params.set('minYear', filters.minYear);
    if (filters.maxKm) params.set('maxKm', filters.maxKm);
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (filters.search) params.set('search', filters.search);

    router.replace(`/cars?${params.toString()}`, { scroll: false });

    try {
      const res = await fetch(`/api/cars?${params.toString()}`);
      const data = await res.json();
      setCars(data.cars || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      brand: 'All',
      fuelType: 'All',
      transmission: 'All',
      bodyType: 'All',
      location: 'All',
      maxPrice: '',
      minYear: '',
      maxKm: '',
      sortBy: 'newest',
      search: '',
    });
  };

  const brands = ['All', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra', 'Kia', 'Toyota', 'Honda', 'Volkswagen', 'BMW', 'Skoda'];
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['All', 'Automatic', 'Manual'];
  const bodyTypes = ['All', 'SUV', 'Sedan', 'Hatchback'];
  const locations = ['All', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi NCR', 'Pune', 'Chennai', 'Kolkata'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search Header Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Pre-Owned Cars Inventory</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing <span className="font-bold text-blue-600">{cars.length}</span> certified inspected vehicles available for immediate purchase
            </p>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                data-component-id="FILTER-002"
                placeholder="Search Creta, Seltos, Thar..."
                value={filters.search}
                onChange={e => handleFilterChange('search', e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filters Sidebar */}
        <aside data-component-id="FILTER-001" className={`lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 ${
          mobileFilterOpen ? 'block fixed inset-0 z-50 overflow-y-auto m-4 bg-white' : 'hidden lg:block'
        }`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filter Inventory</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={resetFilters}
                data-component-id="FILTER-010"
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Brand / Make</label>
            <select
              value={filters.brand}
              data-component-id="FILTER-003"
              onChange={e => handleFilterChange('brand', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Price</label>
            <select
              value={filters.maxPrice}
              data-component-id="FILTER-004"
              onChange={e => handleFilterChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Price</option>
              <option value="800000">Under ₹ 8 Lakh</option>
              <option value="1200000">Under ₹ 12 Lakh</option>
              <option value="1600000">Under ₹ 16 Lakh</option>
              <option value="2000000">Under ₹ 20 Lakh</option>
              <option value="3500000">Under ₹ 35 Lakh</option>
            </select>
          </div>

          {/* Fuel Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Fuel Type</label>
            <div data-component-id="FILTER-005" className="flex flex-wrap gap-1.5">
              {fuelTypes.map(f => (
                <button
                  key={f}
                  onClick={() => handleFilterChange('fuelType', f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    filters.fuelType === f
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Transmission</label>
            <div data-component-id="FILTER-006" className="flex flex-wrap gap-1.5">
              {transmissions.map(t => (
                <button
                  key={t}
                  onClick={() => handleFilterChange('transmission', t)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    filters.transmission === t
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Body Type</label>
            <div data-component-id="FILTER-007" className="flex flex-wrap gap-1.5">
              {bodyTypes.map(bt => (
                <button
                  key={bt}
                  onClick={() => handleFilterChange('bodyType', bt)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    filters.bodyType === bt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          {/* Location City */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City Location</label>
            <select
              value={filters.location}
              data-component-id="FILTER-008"
              onChange={e => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Min Model Year */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Minimum Model Year</label>
            <select
              value={filters.minYear}
              data-component-id="FILTER-009"
              onChange={e => handleFilterChange('minYear', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Year</option>
              <option value="2023">2023 & Newer</option>
              <option value="2022">2022 & Newer</option>
              <option value="2021">2021 & Newer</option>
            </select>
          </div>

          {mobileFilterOpen && (
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs"
            >
              Show {cars.length} Vehicles
            </button>
          )}
        </aside>

        {/* Right Inventory Grid */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Sorting Bar */}
          <div data-component-id="SORT-001" className="flex items-center justify-between bg-white p-3 px-5 rounded-2xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700">
              {cars.length} Cars Available
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort By:</span>
              <select
                value={filters.sortBy}
                data-component-id="SORT-002"
                onChange={e => handleFilterChange('sortBy', e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest Added</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="km_asc">KM: Low to High</option>
                <option value="year_desc">Year: Newest First</option>
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 h-80 animate-pulse p-4 space-y-4">
                  <div className="bg-slate-200 h-40 rounded-xl" />
                  <div className="bg-slate-200 h-4 w-3/4 rounded" />
                  <div className="bg-slate-200 h-4 w-1/2 rounded" />
                </div>
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <CarIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">No cars matched your exact filter criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your price slider or resetting brand and transmission filters to view available inventory.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

export default function CarsListingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading cars inventory...</div>}>
      <CarsListingContent />
    </Suspense>
  );
}
