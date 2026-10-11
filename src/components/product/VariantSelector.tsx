import React from 'react';
import { ProductVariant } from '../../types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  // Extract unique colors and unique storages if available
  const colors = Array.from(
    new Map(
      variants.map((v) => [v.colorName, { name: v.colorName, hex: v.colorHex }])
    ).values()
  );

  const storages = Array.from(
    new Set(variants.map((v) => v.storage).filter(Boolean))
  );

  const handleColorChange = (colorName: string) => {
    // Find matching variant with current storage if possible, else first with this color
    const match =
      variants.find(
        (v) => v.colorName === colorName && v.storage === selectedVariant.storage
      ) || variants.find((v) => v.colorName === colorName);

    if (match) onSelectVariant(match);
  };

  const handleStorageChange = (storage: string) => {
    const match =
      variants.find(
        (v) => v.storage === storage && v.colorName === selectedVariant.colorName
      ) || variants.find((v) => v.storage === storage);

    if (match) onSelectVariant(match);
  };

  return (
    <div className="space-y-4">
      {/* 1. Color Selector with swatches */}
      {colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#111111]">
              Color: <span className="font-normal text-[#737373]">{selectedVariant.colorName}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {colors.map((c) => {
              const isSelected = selectedVariant.colorName === c.name;
              return (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => handleColorChange(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#111111] bg-neutral-100 ring-1 ring-[#111111]'
                      : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                  }`}
                  aria-label={`Select color ${c.name}`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Storage / RAM Selector */}
      {storages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#111111]">
              Configuration: <span className="font-normal text-[#737373]">{selectedVariant.storage}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {storages.map((st) => {
              const isSelected = selectedVariant.storage === st;
              return (
                <button
                  type="button"
                  key={st}
                  onClick={() => handleStorageChange(st!)}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#111111] bg-[#111111] text-white'
                      : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#CCCCCC]'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
