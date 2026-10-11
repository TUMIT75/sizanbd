import React from 'react';
import { BRANDS } from '../../data/brands';
import { formatBDT } from '../../utils/formatters';
import { X, RotateCcw } from 'lucide-react';

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  brands: string[];
  ram: string[];
  storage: string[];
  condition: string[];
  status: string[];
  availability: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
  productCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  isOpenOnMobile = false,
  onCloseMobile,
  productCount,
}) => {
  const ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const conditionOptions = ['New', 'Pre-owned'];
  const statusOptions = ['Official', 'Unofficial'];
  const availabilityOptions = ['In stock', 'Pre-order'];

  const handleCheckboxChange = (
    key: 'brands' | 'ram' | 'storage' | 'condition' | 'status' | 'availability',
    value: string
  ) => {
    setFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 250000,
      brands: [],
      ram: [],
      storage: [],
      condition: [],
      status: [],
      availability: [],
    });
  };

  const hasActiveFilters =
    filters.minPrice > 0 ||
    filters.maxPrice < 250000 ||
    filters.brands.length > 0 ||
    filters.ram.length > 0 ||
    filters.storage.length > 0 ||
    filters.condition.length > 0 ||
    filters.status.length > 0 ||
    filters.availability.length > 0;

  const content = (
    <div className="space-y-6">
      {/* Header / Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
        <div>
          <h3 className="text-sm font-bold text-[#111111]">Filters</h3>
          <p className="text-[11px] text-[#737373]">{productCount} devices match</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-xs text-[#1E5EFF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Price Range */}
      <div>
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          Price Range (BDT)
        </h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="250000"
            step="5000"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
            }
            className="w-full accent-[#111111] cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-[#737373]">
            <span>{formatBDT(filters.minPrice)}</span>
            <span className="font-semibold text-[#111111]">
              Up to {formatBDT(filters.maxPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Brand */}
      <div className="pt-4 border-t border-[#F0F0EE]">
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center justify-between text-xs text-[#111111] hover:text-[#1E5EFF] cursor-pointer py-0.5"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => handleCheckboxChange('brands', brand.name)}
                  className="rounded border-[#CCCCCC] text-[#111111] focus:ring-0 cursor-pointer"
                />
                <span>{brand.name}</span>
              </div>
              <span className="text-[11px] text-[#A3A3A3]">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Condition */}
      <div className="pt-4 border-t border-[#F0F0EE]">
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          Condition
        </h4>
        <div className="space-y-2">
          {conditionOptions.map((cond) => (
            <label
              key={cond}
              className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer py-0.5"
            >
              <input
                type="checkbox"
                checked={filters.condition.includes(cond)}
                onChange={() => handleCheckboxChange('condition', cond)}
                className="rounded border-[#CCCCCC] text-[#111111] focus:ring-0 cursor-pointer"
              />
              <span>{cond}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Status (Official / Unofficial) */}
      <div className="pt-4 border-t border-[#F0F0EE]">
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          Warranty Status
        </h4>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer py-0.5"
            >
              <input
                type="checkbox"
                checked={filters.status.includes(status)}
                onChange={() => handleCheckboxChange('status', status)}
                className="rounded border-[#CCCCCC] text-[#111111] focus:ring-0 cursor-pointer"
              />
              <span>{status === 'Official' ? 'Official (BTRC / National)' : 'Global / Unofficial'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Storage */}
      <div className="pt-4 border-t border-[#F0F0EE]">
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          Storage
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {storageOptions.map((st) => {
            const isSelected = filters.storage.includes(st);
            return (
              <button
                type="button"
                key={st}
                onClick={() => handleCheckboxChange('storage', st)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#737373] border-[#E5E5E5] hover:border-[#111111]'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. RAM */}
      <div className="pt-4 border-t border-[#F0F0EE]">
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          RAM
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ramOptions.map((ram) => {
            const isSelected = filters.ram.includes(ram);
            return (
              <button
                type="button"
                key={ram}
                onClick={() => handleCheckboxChange('ram', ram)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#737373] border-[#E5E5E5] hover:border-[#111111]'
                }`}
              >
                {ram}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Availability */}
      <div className="pt-4 border-t border-[#F0F0EE]">
        <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2.5">
          Availability
        </h4>
        <div className="space-y-2">
          {availabilityOptions.map((avail) => (
            <label
              key={avail}
              className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer py-0.5"
            >
              <input
                type="checkbox"
                checked={filters.availability.includes(avail)}
                onChange={() => handleCheckboxChange('availability', avail)}
                className="rounded border-[#CCCCCC] text-[#111111] focus:ring-0 cursor-pointer"
              />
              <span>{avail}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile Drawer
  if (isOpenOnMobile) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
        <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
          <div className="w-screen max-w-xs bg-white p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] mb-4">
                <span className="text-base font-bold text-[#111111]">Refine Results</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 text-[#737373] hover:text-[#111111]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <div className="pt-4 border-t border-[#E5E5E5] mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-2.5 bg-[#111111] text-white text-xs font-semibold rounded-lg"
              >
                Apply Filters ({productCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Static Sidebar
  return (
    <aside aria-label="Product filters" className="w-64 shrink-0 bg-white border border-[#E5E5E5] rounded-xl p-5 self-start">
      {content}
    </aside>
  );
};
