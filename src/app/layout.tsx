import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComponentInspector from '@/components/ComponentInspector';

export const metadata: Metadata = {
  title: 'AutoNest - Certified Inspected Pre-Owned Cars',
  description: 'Buy and sell quality inspected used cars with transparent pricing, 200+ point quality inspection, 5-day moneyback guarantee, and instant financing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <ComponentInspector />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
