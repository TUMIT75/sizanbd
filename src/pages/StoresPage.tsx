import React, { useState } from 'react';
import { OUTLETS } from '../data/outlets';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { SafeImage } from '../components/common/SafeImage';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const StoresPage: React.FC = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(OUTLETS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Our Showrooms' }]} />

      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF]">
          Physical Experience Centers
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-0.5">
          Visit Our Showrooms in Dhaka
        </h1>
        <p className="text-xs sm:text-sm text-[#737373] mt-1 max-w-xl">
          Walk into any of our 4 official branches. Inspect original seals, verify IMEIs on BTRC portal, and test display units freely.
        </p>
      </div>

      {/* Outlet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OUTLETS.map((outlet) => {
          const isSelected = selectedOutlet.id === outlet.id;

          return (
            <div
              key={outlet.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#111111] ring-1 ring-[#111111] shadow-xs'
                  : 'border-[#E5E5E5] hover:border-[#CCCCCC]'
              }`}
            >
              <div>
                <div className="relative h-48 w-full bg-[#FAFAF8] overflow-hidden">
                  <SafeImage
                    src={outlet.image}
                    alt={outlet.name}
                    className="w-full h-full object-cover"
                  />
                  {outlet.isFlagship && (
                    <span className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded z-20">
                      Flagship Store
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#111111]">
                      {outlet.name}
                    </h3>
                    <p className="text-xs text-[#1E5EFF] font-medium mt-0.5">
                      {outlet.floor}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#4A4A4A]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#737373] shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#737373] shrink-0" />
                      <span>Direct: {outlet.phone} · Hotline: {outlet.hotline}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#737373] shrink-0 mt-0.5" />
                      <div>
                        <span>{outlet.hours}</span>
                        <span className="block text-[#737373] text-[11px]">{outlet.fridayHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <a
                  href={outlet.mapDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    Google Map Directions
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOutlet(outlet)}
                >
                  View Map
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Map Embed */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#111111]">
              Location Map: {selectedOutlet.name}
            </h3>
            <p className="text-xs text-[#737373] mt-0.5">
              {selectedOutlet.address}
            </p>
          </div>

          <a
            href={selectedOutlet.mapDirectionUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              Open in Google Maps
            </Button>
          </a>
        </div>

        <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#E5E5E5] bg-[#FAFAF8]">
          <iframe
            title={`Map of ${selectedOutlet.name}`}
            src={selectedOutlet.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
