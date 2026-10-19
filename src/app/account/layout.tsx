import Link from 'next/link';
import { User, Heart, Calendar, MessageSquare, Settings, LogOut } from 'lucide-react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    { href: '/account/profile', label: 'My Profile', icon: User },
    { href: '/account/favourites', label: 'Saved Favourites', icon: Heart },
    { href: '/account/test-drives', label: 'Test Drive Bookings', icon: Calendar },
    { href: '/account/enquiries', label: 'My Enquiries', icon: MessageSquare },
    { href: '/account/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div data-component-id="ACC-001" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Customer Sidebar Navigation */}
        <aside data-component-id="ACC-002" className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900">Customer Account</h2>
            <p className="text-xs text-slate-500">Manage bookings & wishlists</p>
          </div>

          <nav className="space-y-1">
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span>{t.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {children}
        </main>

      </div>
    </div>
  );
}
