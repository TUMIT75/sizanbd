import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar, FilterState } from '../components/product/FilterSidebar';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Skeleton } from '../components/common/Skeleton';
import { SlidersHorizontal, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/common/Button';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = CATEGORIES.find((c) => c.slug === slug);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 250000,
    brands: [],
    ram: [],
    storage: [],
    condition: [],
    status: [],
    availability: [],
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [slug, filters, sortBy]);

  // All products in this category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.categorySlug === slug);
  }, [slug]);

  // Filtered
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false;
      if (filters.status.length > 0 && !filters.status.includes(p.status)) return false;
      if (filters.availability.length > 0 && !filters.availability.includes(p.stockStatus)) return false;

      if (filters.ram.length > 0) {
        const matchesRam = filters.ram.some(
          (r) =>
            p.specs.ram?.toLowerCase().includes(r.toLowerCase()) ||
            p.variants.some((v) => v.ram?.toLowerCase().includes(r.toLowerCase()))
        );
        if (!matchesRam) return false;
      }

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
  }, [categoryProducts, filters]);

  // Sorted
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    return list.sort((a, b) => b.reviewCount - a.reviewCount);
  }, [filteredProducts, sortBy]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-[#111111]">Category Not Found</h1>
        <p className="text-xs text-[#737373] mt-2 mb-6">
          The requested device collection does not exist or has been moved.
        </p>
        <Link to="/shop">
          <Button variant="primary">Browse All Devices</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/shop' },
            { label: category.name },
          ]}
          className="mb-3"
        />

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF]">
              Category
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-0.5">
              {category.name}
            </h1>
            <p className="text-xs text-[#737373] mt-1 max-w-xl">
              {category.tagline}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-semibold text-[#111111] block">
              {categoryProducts.length} Items Available
            </span>
            <span className="text-[11px] text-emerald-600">
              Verified in showroom
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between gap-3 p-3 bg-white border border-[#E5E5E5] rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg text-[#111111] hover:bg-[#F0F0EE] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
          <span className="text-xs text-[#737373]">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#737373]">
            <ArrowUpDown className="w-3.5 h-3.5 hidden sm:inline" />
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

          <div className="hidden sm:flex items-center border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#FAFAF8]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#111111] shadow-2xs font-semibold' : 'text-[#737373]'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-[#111111] shadow-2xs font-semibold' : 'text-[#737373]'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters */}
      <div className="flex items-start gap-6">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          isOpenOnMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
          productCount={filteredProducts.length}
        />

        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 bg-white border border-[#E5E5E5] rounded-xl space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E5E5E5] rounded-xl">
              <p className="text-sm font-semibold text-[#111111]">
                No matching devices in {category.name}
              </p>
              <p className="text-xs text-[#737373] mt-1 mb-5">
                Try widening your price range or adjusting filters.
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
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                  : 'flex flex-col gap-3'
              }
            >
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
