'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Search, Heart, User, ShieldCheck, Menu, X, LogOut, ArrowRight, Calculator, GitCompare } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/cars', label: 'Buy Used Cars' },
    { href: '/sell-your-car', label: 'Sell Your Car' },
    { href: '/compare', label: 'Compare Cars' },
    { href: '/finance', label: 'EMI Calculator' },
    { href: '/about', label: 'Why AutoNest' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const navLinkIds: Record<string, string> = {
    '/cars': 'NAV-004',
    '/sell-your-car': 'NAV-005',
    '/compare': 'NAV-006',
    '/finance': 'NAV-007',
    '/about': 'NAV-008',
    '/contact': 'NAV-009',
  };

  return (
    <header data-component-id="NAV-001" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" data-component-id="NAV-002" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
                Auto<span className="text-blue-600">Nest</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-slate-500 uppercase -mt-1">
                Inspected Pre-Owned Cars
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav data-component-id="NAV-003" className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              const navId = navLinkIds[link.href];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-component-id={navId}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sell-your-car"
              data-component-id="NAV-010"
              className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 flex items-center gap-1.5"
            >
              Sell Car
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    data-component-id="NAV-013"
                    className="px-3 py-1.5 text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 rounded-md flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                <Link
                  href="/account/favourites"
                  data-component-id="NAV-011"
                  className="p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors relative"
                  title="Favourites"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                <Link
                  href="/account/profile"
                  data-component-id="NAV-012"
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 text-xs font-semibold transition-colors"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  data-component-id="NAV-014"
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  data-component-id="NAV-012"
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-component-id="NAV-015"
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div data-component-id="NAV-016" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/account/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 bg-slate-100 rounded-lg flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  My Account ({user.name})
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-semibold bg-amber-50 text-amber-800 rounded-lg flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 font-medium hover:bg-rose-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
