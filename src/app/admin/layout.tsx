import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, Car, PlusCircle, Calendar, MessageSquare, DollarSign, Users, Wrench, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard Metrics', icon: LayoutDashboard },
    { href: '/admin/cars', label: 'Manage Cars Inventory', icon: Car },
    { href: '/admin/cars/new', label: 'Add New Car', icon: PlusCircle },
    { href: '/admin/bookings', label: 'Test Drive Requests', icon: Calendar },
    { href: '/admin/enquiries', label: 'Customer Enquiries', icon: MessageSquare },
    { href: '/admin/sell-leads', label: 'Sell-Car Leads', icon: DollarSign },
    { href: '/admin/customers', label: 'Customer Directory', icon: Users },
    { href: '/admin/inspections', label: '200+ Pt Inspections', icon: Wrench },
    { href: '/admin/settings', label: 'Dealership Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      
      {/* Admin Sidebar */}
      <aside data-component-id="ADMIN-001" className="w-full lg:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">AutoNest Admin</div>
              <div className="text-[10px] text-amber-400 font-semibold uppercase">Management Suite</div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500">
          Logged in as <span className="text-slate-300 font-bold">Administrator</span>
          <div className="mt-1">
            <Link href="/" className="text-blue-400 hover:underline">← Exit to Public Site</Link>
          </div>
        </div>
      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 p-6 sm:p-10 overflow-x-auto">
        {children}
      </main>

    </div>
  );
}
