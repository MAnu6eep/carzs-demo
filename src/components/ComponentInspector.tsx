'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { COMPONENT_REGISTRY } from '@/config/componentRegistry';
import { X, ArrowLeft, Copy, Check, ExternalLink, AlertCircle, ShieldAlert } from 'lucide-react';

function InspectorEngine() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const targetId = searchParams.get('component');
  const instanceIndex = searchParams.get('instance');

  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);
  const [copied, setCopied] = useState(false);

  const registryItem = COMPONENT_REGISTRY.find(c => c.id === targetId);

  useEffect(() => {
    if (!targetId) {
      // Clean up any previously highlighted elements if param removed
      document.querySelectorAll('[data-inspector-highlighted="true"]').forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.outline = '';
        htmlEl.style.outlineOffset = '';
        htmlEl.style.boxShadow = '';
        htmlEl.removeAttribute('data-inspector-highlighted');
      });
      setActiveElement(null);
      setNotFoundError(false);
      return;
    }

    setNotFoundError(false);
    let attempts = 0;
    const maxAttempts = 30; // 3 seconds retry loop for async data loading

    const locateAndHighlight = () => {
      attempts++;
      const selector = `[data-component-id="${targetId}"]`;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

      if (elements.length > 0) {
        // Select instance if index specified, otherwise default to first matching element
        let targetEl = elements[0];
        if (instanceIndex && elements[Number(instanceIndex)]) {
          targetEl = elements[Number(instanceIndex)];
        }

        // Clean previous highlights
        document.querySelectorAll('[data-inspector-highlighted="true"]').forEach(el => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.outline = '';
          htmlEl.style.outlineOffset = '';
          htmlEl.style.boxShadow = '';
          htmlEl.removeAttribute('data-inspector-highlighted');
        });

        // Apply Gold Outline & Glow
        targetEl.setAttribute('data-inspector-highlighted', 'true');
        targetEl.style.outline = '4px solid #f59e0b';
        targetEl.style.outlineOffset = '4px';
        targetEl.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.7)';

        // Smooth scroll to middle of viewport
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setActiveElement(targetEl);
        setNotFoundError(false);
        return true;
      }

      if (attempts >= maxAttempts) {
        setNotFoundError(true);
        return true;
      }

      return false;
    };

    if (!locateAndHighlight()) {
      const interval = setInterval(() => {
        if (locateAndHighlight()) {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [targetId, instanceIndex, pathname]);

  if (!targetId) return null;

  const handleExitInspection = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('component');
    params.delete('instance');
    const newQuery = params.toString();
    router.replace(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false });
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${pathname}?${searchParams.toString()}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Sticky Top Developer Inspector Bar */}
      <div className="fixed top-0 left-0 right-0 z-[99999] bg-slate-900/95 backdrop-blur-md text-white border-b-2 border-amber-500 shadow-2xl px-4 py-2.5 flex items-center justify-between text-xs animate-in slide-in-from-top duration-300">
        
        <div className="flex items-center gap-3 truncate">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-slate-950 font-extrabold rounded-md shadow-sm shrink-0 uppercase tracking-wider text-[11px]">
            <span>🔍 Inspector Active</span>
          </div>

          <div className="font-mono font-bold text-amber-400 text-sm truncate">
            {targetId}
          </div>

          <div className="hidden sm:block text-slate-300 font-semibold truncate">
            • {registryItem?.name || 'DOM Component'} ({registryItem?.type || 'UI Element'})
          </div>

          <div className="hidden md:block text-slate-500 text-[11px] font-mono truncate">
            [{registryItem?.sourceFile || 'Source'}]
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="Copy Direct Link to highlighted component"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied Link!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={() => router.push('/dev/components')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Component Directory</span>
          </button>

          <button
            onClick={handleExitInspection}
            className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
            title="Exit Highlight Inspection Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Component Not Found Error Toast */}
      {notFoundError && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-rose-900/95 text-white border-2 border-rose-500 p-4 rounded-2xl shadow-2xl max-w-md space-y-2 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span>Target Component Not Found in DOM</span>
          </div>
          <p className="text-xs text-rose-100">
            Element <code className="font-mono bg-rose-950 px-1.5 py-0.5 rounded text-amber-300">{targetId}</code> ({registryItem?.name || 'Component'}) could not be located on route <code className="font-mono bg-rose-950 px-1 py-0.5 rounded text-slate-200">{pathname}</code>.
          </p>
          <div className="text-[11px] text-rose-300 pt-1 border-t border-rose-800/80">
            • Component may be conditionally unmounted, tab hidden, or pending user interaction.
          </div>
        </div>
      )}
    </>
  );
}

export default function ComponentInspector() {
  return (
    <Suspense fallback={null}>
      <InspectorEngine />
    </Suspense>
  );
}
