import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('popular');
  const [searchInput, setSearchInput] = useState(query);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const sortedResults = useMemo(() => {
    const list = [...searchResults];
    if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    return list.sort((a, b) => b.reviewCount - a.reviewCount);
  }, [searchResults, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Search Results' },
          { label: query ? `"${query}"` : 'All' },
        ]}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            Search Results for "{query}"
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Found {searchResults.length} matching devices & accessories in stock.
          </p>
        </div>

        {/* Refine Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-sm w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search another gadget..."
            className="flex-1 h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#111111] outline-none focus:border-[#111111]"
          />
          <Button type="submit" variant="primary" size="sm">
            Search
          </Button>
        </form>
      </div>

      {/* Sort row */}
      {searchResults.length > 0 && (
        <div className="flex justify-end items-center gap-2 text-xs text-[#737373]">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#E5E5E5] rounded-lg text-xs font-medium text-[#111111] py-1.5 px-2.5 outline-none focus:border-[#111111] cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      )}

      {/* Results grid or empty state */}
      {searchResults.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E5E5E5] rounded-xl max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#737373] mx-auto mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#111111]">
            No devices found matching "{query}"
          </h2>
          <p className="text-xs text-[#737373] mt-1 mb-5">
            Check the spelling or try searching for generic terms like "iPhone", "Samsung", "Pixel", "MacBook", or "Anker".
          </p>
          <Link to="/shop">
            <Button variant="primary" size="md">
              Browse All Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
