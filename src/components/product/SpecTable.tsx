import React from 'react';
import { Product } from '../../types';

interface SpecTableProps {
  specs: Product['specs'];
  brand: string;
  sku: string;
  status: string;
}

export const SpecTable: React.FC<SpecTableProps> = ({ specs, brand, sku, status }) => {
  const rows = [
    { label: 'Brand', value: brand },
    { label: 'Model SKU', value: sku },
    { label: 'Warranty Classification', value: status === 'Official' ? 'Official BTRC / National Warranty' : 'Global Authentic Hardware / SIZANBD Service Warranty' },
    { label: 'Display & Screen', value: specs.display },
    { label: 'Processor & Chipset', value: specs.processor },
    { label: 'RAM Memory', value: specs.ram },
    { label: 'Internal Storage', value: specs.storage },
    { label: 'Rear Camera System', value: specs.rearCamera },
    { label: 'Front / Selfie Camera', value: specs.frontCamera },
    { label: 'Battery Capacity', value: specs.battery },
    { label: 'Charging & Power', value: specs.charging },
    { label: 'Operating System', value: specs.os },
    { label: 'Network & Connectivity', value: specs.network },
    specs.build ? { label: 'Body & Build Material', value: specs.build } : null,
    specs.weight ? { label: 'Weight', value: specs.weight } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
          Technical Specifications
        </h4>
      </div>

      <div className="divide-y divide-[#F0F0EE]">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-3 px-5 py-3.5 text-xs hover:bg-[#FAFAF8]/50 transition-colors"
          >
            <div className="font-medium text-[#737373] md:col-span-1">
              {row.label}
            </div>
            <div className="text-[#111111] md:col-span-2 font-normal mt-1 md:mt-0 leading-relaxed">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
