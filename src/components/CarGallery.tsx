'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface CarGalleryProps {
  images: { id?: string; url: string; isPrimary?: boolean }[];
  title: string;
}

export default function CarGallery({ images, title }: CarGalleryProps) {
  const imageList = images && images.length > 0
    ? images
    : [{ url: '/images/cars/car-photo-1.jpeg' }];

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const activeImage = imageList[activeIndex]?.url || imageList[0].url;

  return (
    <div data-component-id="GALLERY-001" className="space-y-3">
      
      {/* Main Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-900 rounded-3xl overflow-hidden shadow-lg group">
        <Image
          data-component-id="GALLERY-002"
          src={activeImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300"
          sizes="(max-width: 1200px) 100vw, 60vw"
        />

        {/* Fullscreen Button */}
        <button
          onClick={() => setFullscreenOpen(true)}
          data-component-id="GALLERY-003"
          className="absolute top-4 right-4 p-2.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md transition-all shadow-md z-10 flex items-center gap-1.5 text-xs font-semibold"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Expand Photos</span>
        </button>

        {/* Photo Counter */}
        <div data-component-id="GALLERY-004" className="absolute bottom-4 left-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md text-white rounded-full text-xs font-semibold flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>{activeIndex + 1} / {imageList.length}</span>
        </div>

        {/* Prev / Next Arrows */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1))}
              data-component-id="GALLERY-005"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveIndex(prev => (prev === imageList.length - 1 ? 0 : prev + 1))}
              data-component-id="GALLERY-005"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div data-component-id="GALLERY-006" className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                activeIndex === idx
                  ? 'border-blue-600 ring-2 ring-blue-500/30 scale-95'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div data-component-id="GALLERY-007" className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/10] max-h-[85vh]">
            <Image
              src={activeImage}
              alt={title}
              fill
              className="object-contain"
            />
          </div>

          {imageList.length > 1 && (
            <>
              <button
                onClick={() => setActiveIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1))}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => setActiveIndex(prev => (prev === imageList.length - 1 ? 0 : prev + 1))}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
}
