'use client';

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Account Settings</h1>
        <p className="text-xs text-slate-500">Security preferences & notification settings</p>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-900">Email & SMS Notifications</div>
        <p>You will receive instant SMS & Email notifications for test drive confirmations and price drops on your favourited cars.</p>
      </div>
    </div>
  );
}
