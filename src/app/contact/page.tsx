import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact AutoNest Dealership</h1>
        <p className="text-xs text-slate-500">Reach out to our customer support or visit our nearest Car Hub</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2">
          <Phone className="w-8 h-8 text-blue-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Toll Free Support</h3>
          <p className="text-xs text-slate-500">+91 1800-123-4567</p>
          <p className="text-[11px] text-slate-400">Available Mon - Sun (9 AM - 9 PM)</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2">
          <Mail className="w-8 h-8 text-blue-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Email Enquiries</h3>
          <p className="text-xs text-slate-500">support@autonest.com</p>
          <p className="text-[11px] text-slate-400">Average response time: 15 mins</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Headquarters Hub</h3>
          <p className="text-xs text-slate-500">AutoNest Hub, MG Road, Electronic City Phase 1, Bangalore, 560100</p>
        </div>
      </div>
    </div>
  );
}
