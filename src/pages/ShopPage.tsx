import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar, FilterState } from '../components/product/FilterSidebar';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Skeleton } from '../components/common/Skeleton';
import { SlidersHorizontal, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Initialize filter state from URL params if present
  const initialMin = Number(searchParams.get('min')) || 0;
  const initialMax = Number(searchParams.get('max')) || 250000;
  const initialBrand = searchParams.get('brand');

  const [filters, setFilters] = useState<FilterState>({
    minPrice: initialMin,
    maxPrice: initialMax,
    brands: initialBrand ? [initialBrand] : [],
    ram: [],
    storage: [],
    condition: [],
    status: [],
    availability: [],
  });

  // Sync if url params change
  useEffect(() => {
    const brand = searchParams.get('brand');
    const min = Number(searchParams.get('min')) || 0;
    const max = Number(searchParams.get('max')) || 250000;
    const sort = searchParams.get('sort');

    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      brands: brand ? [brand] : prev.brands,
    }));
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Simulate subtle loading state when filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Price range
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;

      // Brand
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;

      // Condition
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false;

      // Status
      if (filters.status.length > 0 && !filters.status.includes(p.status)) return false;

      // Availability
      if (filters.availability.length > 0 && !filters.availability.includes(p.stockStatus)) return false;

      // RAM
      if (filters.ram.length > 0) {
        const matchesRam = filters.ram.some(
          (r) =>
            p.specs.ram?.toLowerCase().includes(r.toLowerCase()) ||
            p.variants.some((v) => v.ram?.toLowerCase().includes(r.toLowerCase()))
        );
        if (!matchesRam) return false;
      }

      // Storage
      if (filters.storage.length > 0) {
        const matchesStorage = filters.storage.some(
          (s) =>
            p.specs.storage?.toLowerCase().includes(s.toLowerCase()) ||
            p.variants.some((v) => v.storage?.toLowerCase().includes(s.toLowerCase()))
        );
        if (!matchesStorage) return false;
      }

      return true;
    });
  }, [filters]);

  // Sort products logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    // popular
    return list.sort((a, b) => b.reviewCount - a.reviewCount);
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Breadcrumb & Heading */}
      <div>
        <Breadcrumb items={[{ label: 'Shop All Products' }]} className="mb-3" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
              All Devices & Gadgets
            </h1>
            <p className="text-xs text-[#737373] mt-1">
              Showing {filteredProducts.length} devices with authentic warranty & on-the-spot verification.
            </p>
          </div>
        </div>
      </div>

      {/* Control Bar: Mobile Filter Button, Sort dropdown, Grid/List view */}
      <div className="flex items-center justify-between gap-3 p-3 bg-white border border-[#E5E5E5] rounded-xl">
        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg text-[#111111] hover:bg-[#F0F0EE] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          <span className="text-xs text-[#737373] hidden sm:inline">
            {filteredProducts.length} items found
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#737373]">
            <ArrowUpDown className="w-3.5 h-3.5 hidden sm:inline" />
            <span className="hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg text-xs font-medium text-[#111111] py-1.5 px-2.5 outline-none focus:border-[#111111] cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#FAFAF8]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Products */}
      <div className="flex items-start gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            productCount={filteredProducts.length}
          />
        </div>

        {/* Mobile Filter Drawer */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          isOpenOnMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
          productCount={filteredProducts.length}
        />

        {/* Product Grid / List */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 bg-white border border-[#E5E5E5] rounded-xl space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E5E5E5] rounded-xl">
              <p className="text-sm font-semibold text-[#111111]">
                No matching devices found
              </p>
              <p className="text-xs text-[#737373] mt-1 mb-5">
                Try widening your price range or clearing brand filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilters({
                    minPrice: 0,
                    maxPrice: 250000,
                    brands: [],
                    ram: [],
                    storage: [],
                    condition: [],
                    status: [],
                    availability: [],
                  })
                }
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                    : 'flex flex-col gap-3'
                }
              >
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Load more button if there are remaining items */}
              {visibleCount < sortedProducts.length && (
                <div className="text-center pt-6">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                  >
                    Load More Devices ({sortedProducts.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
