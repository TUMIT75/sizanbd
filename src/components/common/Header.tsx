import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';
import { formatBDT } from '../../utils/formatters';
import {
  Search,
  ShoppingBag,
  Heart,
  Scale,
  User,
  Menu,
  X,
  Phone,
  MapPin,
  Truck,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    getCartCount,
    wishlist,
    compareList,
    setIsCartDrawerOpen,
  } = useStore();

  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close search popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live suggestions
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
        );
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Phones', href: '/category/phones' },
    { label: 'Tablets', href: '/category/tablets' },
    { label: 'Laptops', href: '/category/laptops' },
    { label: 'Audio', href: '/category/audio' },
    { label: 'Wearables', href: '/category/wearables' },
    { label: 'Accessories', href: '/category/accessories' },
    { label: 'Offers', href: '/offers', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* 1. Slim Top Bar */}
      <div className="bg-[#111111] text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="tel:09612404040"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span className="hidden sm:inline">Hotline:</span>
              <span className="font-medium text-white">09612-404040</span>
            </a>
            <span className="text-neutral-700 hidden sm:inline" aria-hidden="true">|</span>
            <span className="hidden md:inline text-neutral-400">
              Same-day delivery inside Dhaka for orders before 3 PM
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/stores"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span>Visit our showroom</span>
            </Link>
            <span className="text-neutral-700" aria-hidden="true">|</span>
            <Link
              to="/track-order"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div
        className={`bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-all duration-200 ${
          isScrolled ? 'py-2.5 shadow-xs' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#111111] hover:bg-neutral-100 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* SIZANBD Wordmark Logo */}
          <Link
            to="/"
            className="flex items-baseline gap-1 select-none group"
            aria-label="SIZANBD Home"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#111111]">
              SIZAN<span className="text-[#1E5EFF]">BD</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#737373] tracking-widest hidden sm:inline ml-1">
              Devices
            </span>
          </Link>

          {/* Desktop Search Bar with Live Suggestions */}
          <div
            ref={searchContainerRef}
            className="relative hidden md:block flex-1 max-w-md mx-4"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search iPhone, MacBook, Sony, Anker..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#FAFAF8] hover:bg-[#F5F5F3] focus:bg-white text-sm text-[#111111] placeholder:text-[#8E8E93] rounded-lg border border-[#E5E5E5] focus:border-[#111111] pl-9.5 pr-8 py-2 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Search Suggestions Popover */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E5E5] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in duration-150">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#F0F0EE]">
                    <div className="px-3 py-2 bg-[#FAFAF8] text-[11px] font-semibold text-[#737373] uppercase tracking-wider flex justify-between">
                      <span>Matching Products</span>
                      <span>Press enter to see all</span>
                    </div>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center gap-3 p-3 hover:bg-[#FAFAF8] transition-colors"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-md border border-[#E5E5E5] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#111111] truncate">
                            {product.title}
                          </p>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            {product.brand} · {product.categoryName}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-[#111111]">
                            {formatBDT(product.price)}
                          </p>
                          <span className="text-[10px] text-[#1E5EFF] font-medium">
                            {product.status}
                          </span>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="block p-2.5 text-center text-xs font-medium text-[#1E5EFF] bg-[#FAFAF8] hover:bg-[#F0F4FF] transition-colors"
                    >
                      View all results for "{searchQuery}" →
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-[#737373]">
                      No products found matching "{searchQuery}"
                    </p>
                    <p className="text-[11px] text-[#A3A3A3] mt-1">
                      Check spelling or try searching for "iPhone" or "MacBook"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: Compare, Wishlist, Account, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Compare */}
            <Link
              to="/compare"
              className="relative p-2 text-[#111111] hover:text-[#1E5EFF] hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label={`Compare products (${compareList.length})`}
              title="Compare Devices"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#111111] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#111111] hover:text-[#1E5EFF] hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label={`Wishlist (${wishlist.length})`}
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#111111] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="p-2 text-[#111111] hover:text-[#1E5EFF] hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Customer Account"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 bg-[#111111] text-white hover:bg-[#262626] rounded-lg transition-colors flex items-center gap-2 cursor-pointer ml-1"
              aria-label={`Shopping bag with ${getCartCount()} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold pr-1 hidden sm:inline">
                {getCartCount()}
              </span>
              {getCartCount() > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1E5EFF] text-white text-[10px] font-bold flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden px-4 pt-2.5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search gadgets, models, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] text-sm text-[#111111] placeholder:text-[#8E8E93] rounded-lg border border-[#E5E5E5] pl-9 pr-4 py-2 outline-none focus:border-[#111111]"
            />
            <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* 3. Category Navigation Strip (Desktop) */}
      <nav aria-label="Main Navigation" className="hidden lg:block bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center space-x-8 text-xs font-medium text-[#111111] py-2.5">
            <li>
              <Link
                to="/shop"
                className={`hover:text-[#1E5EFF] transition-colors py-1 ${
                  location.pathname === '/shop' ? 'text-[#1E5EFF] font-semibold' : ''
                }`}
              >
                All Products
              </Link>
            </li>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`hover:text-[#1E5EFF] transition-colors py-1 flex items-center gap-1.5 ${
                      isActive ? 'text-[#1E5EFF] font-semibold' : ''
                    } ${link.highlight ? 'text-[#1E5EFF] font-semibold' : ''}`}
                  >
                    {link.label}
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E5EFF]" />
                    )}
                  </Link>
                </li>
              );
            })}
            <li className="ml-auto text-xs text-[#737373] flex items-center gap-2">
              <span>Showroom: Bashundhara City & Jamuna Future Park</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-black tracking-tight text-[#111111]"
                >
                  SIZAN<span className="text-[#1E5EFF]">BD</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#737373] hover:text-[#111111]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-2">
                <div className="px-4 py-2 text-[11px] font-semibold text-[#737373] uppercase tracking-wider">
                  Categories
                </div>
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-[#111111] hover:bg-[#FAFAF8]"
                >
                  <span>All Products</span>
                  <ArrowRight className="w-4 h-4 text-[#A3A3A3]" />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-[#111111] hover:bg-[#FAFAF8]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#A3A3A3]" />
                  </Link>
                ))}
              </div>

              <div className="py-2 border-t border-[#E5E5E5]">
                <div className="px-4 py-2 text-[11px] font-semibold text-[#737373] uppercase tracking-wider">
                  Quick Links
                </div>
                <Link
                  to="/stores"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-[#737373] hover:text-[#111111]"
                >
                  Showroom Locations & Hours
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-[#737373] hover:text-[#111111]"
                >
                  Track Your Order
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-[#737373] hover:text-[#111111]"
                >
                  About SIZANBD
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-[#737373] hover:text-[#111111]"
                >
                  Help & FAQs
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E5E5] bg-[#FAFAF8] text-xs text-[#737373]">
              <p className="font-semibold text-[#111111]">Hotline: 09612-404040</p>
              <p className="mt-0.5">Sat-Thu: 10 AM - 9 PM</p>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
};
