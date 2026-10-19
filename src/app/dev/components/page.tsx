'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { COMPONENT_REGISTRY, ComponentRegistryItem } from '@/config/componentRegistry';
import {
  Search,
  Filter,
  Eye,
  Copy,
  Check,
  ExternalLink,
  Code,
  Layers,
  FileCode,
  Sparkles,
  Info,
  X,
  ChevronRight,
  ShieldCheck,
  Terminal,
  Grid
} from 'lucide-react';

export default function ComponentDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedPage, setSelectedPage] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeItem, setActiveItem] = useState<ComponentRegistryItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Extract unique filter options
  const pagesList = useMemo(() => {
    const set = new Set<string>();
    COMPONENT_REGISTRY.forEach(item => set.add(item.page));
    return Array.from(set).sort();
  }, []);

  const typesList = useMemo(() => {
    const set = new Set<string>();
    COMPONENT_REGISTRY.forEach(item => set.add(item.type));
    return Array.from(set).sort();
  }, []);

  // Filtered dataset
  const filteredRegistry = useMemo(() => {
    return COMPONENT_REGISTRY.filter(item => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.page.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.sourceFile.toLowerCase().includes(q);

      const matchesPage = selectedPage === 'ALL' || item.page === selectedPage;
      const matchesType = selectedType === 'ALL' || item.type === selectedType;
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

      return matchesSearch && matchesPage && matchesType && matchesStatus;
    });
  }, [search, selectedPage, selectedType, selectedStatus]);

  // Statistics
  const totalCount = COMPONENT_REGISTRY.length;
  const reusableCount = COMPONENT_REGISTRY.filter(c => c.reusable).length;
  const pagesCount = pagesList.length;

  const resolveTargetUrl = (item: ComponentRegistryItem): string => {
    let basePath = item.page;
    if (basePath === 'Global') {
      basePath = '/';
    } else if (basePath === '/cars/[id]') {
      basePath = '/cars/car-1';
    } else if (basePath === '/account') {
      basePath = '/account/profile';
    } else if (basePath === '/admin') {
      basePath = '/admin/dashboard';
    }
    return `${basePath}?component=${encodeURIComponent(item.id)}`;
  };

  const copyToClipboard = (text: string, isLink: boolean) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Developer Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Terminal className="w-3.5 h-3.5" /> Developer Tools & Component Explorer
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Master Component Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive visual index mapping UI elements to source files with 1-click Gold Outline inspection.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center">
              <div className="text-2xl font-extrabold text-amber-400">{totalCount}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Components</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center">
              <div className="text-2xl font-extrabold text-blue-400">{reusableCount}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reusable</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center">
              <div className="text-2xl font-extrabold text-emerald-400">{pagesCount}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pages</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Search Input */}
            <div className="relative md:col-span-1">
              <input
                type="text"
                placeholder="Search ID, name, file..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>

            {/* Filter by Page */}
            <div>
              <select
                value={selectedPage}
                onChange={e => setSelectedPage(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              >
                <option value="ALL">All Pages ({pagesList.length})</option>
                {pagesList.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Filter by Type */}
            <div>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              >
                <option value="ALL">All Types ({typesList.length})</option>
                {typesList.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              >
                <option value="ALL">All Statuses</option>
                <option value="Implemented">Implemented</option>
                <option value="Reusable">Reusable</option>
                <option value="Deprecated">Deprecated</option>
              </select>
            </div>

          </div>

          {/* Active Filter Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <div>
              Showing <span className="text-white font-bold">{filteredRegistry.length}</span> of <span className="text-slate-400">{totalCount}</span> components
            </div>

            {(search || selectedPage !== 'ALL' || selectedType !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedPage('ALL');
                  setSelectedType('ALL');
                  setSelectedStatus('ALL');
                }}
                className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-4 px-4">Component ID</th>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Page</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Source File</th>
                  <th className="py-4 px-4 text-center">Inspect Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredRegistry.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No components match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRegistry.map(item => {
                    const targetUrl = resolveTargetUrl(item);

                    return (
                      <tr
                        key={item.id}
                        onClick={() => setActiveItem(item)}
                        className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                          {item.id}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                          {item.page}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 truncate max-w-xs">
                          {item.location}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-blue-400 text-[11px] truncate max-w-xs">
                          {item.sourceFile}
                        </td>
                        <td className="py-3.5 px-4 text-center" onClick={e => e.stopPropagation()}>
                          <Link
                            href={targetUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all"
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Detail Side Drawer */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs rounded-lg">
                    {activeItem.id}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {activeItem.type}
                  </span>
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Component Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{activeItem.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activeItem.location}</p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <div className="text-slate-500 font-semibold uppercase text-[10px]">Target Page</div>
                    <div className="font-mono text-white font-bold">{activeItem.page}</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <div className="text-slate-500 font-semibold uppercase text-[10px]">Source Code File</div>
                    <div className="font-mono text-blue-400 font-bold">{activeItem.sourceFile}</div>
                  </div>

                  {activeItem.reusable && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Used On Pages</div>
                      <div className="text-slate-300 font-semibold">
                        {(activeItem.usedOnPages || [activeItem.page]).join(', ')}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <div className="text-slate-500 font-semibold uppercase text-[10px]">HTML Inspector Selector</div>
                    <div className="font-mono text-amber-400 text-[11px]">
                      [data-component-id="{activeItem.id}"]
                    </div>
                  </div>
                </div>

                {/* Quick Copy Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => copyToClipboard(activeItem.id, false)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId ? 'Copied ID!' : 'Copy ID'}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(window.location.origin + resolveTargetUrl(activeItem), true)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <ExternalLink className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied Link!' : 'Copy Direct Link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Primary Action CTA */}
            <div className="pt-6 border-t border-slate-800">
              <Link
                href={resolveTargetUrl(activeItem)}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Navigate & Highlight with Gold Outline</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
