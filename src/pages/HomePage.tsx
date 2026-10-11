import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { OUTLETS } from '../data/outlets';
import { ProductCard } from '../components/product/ProductCard';
import { formatBDT } from '../utils/formatters';
import {
  ShieldCheck,
  CreditCard,
  RefreshCw,
  Truck,
  Wrench,
  ChevronRight,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Clean real photography hero slides
  const heroSlides = [
    {
      title: 'iPhone 16 Pro Max',
      subtitle: 'Aerospace-grade titanium. A18 Pro. Active official warranty.',
      cta: 'Explore Flagship',
      link: '/product/apple-iphone-16-pro-max',
      priceText: 'From ৳1,69,999',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'MacBook Air M3',
      subtitle: '18 hours battery life. Fanless silence. Work anywhere in the city.',
      cta: 'View MacBooks',
      link: '/product/apple-macbook-air-m3-13-inch',
      priceText: 'From ৳1,34,500',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Galaxy S25 Ultra 5G',
      subtitle: 'Snapdragon 8 Elite. Built-in S-Pen. Anti-reflective Gorilla Armor.',
      cta: 'Check Device',
      link: '/product/samsung-galaxy-s25-ultra',
      priceText: 'From ৳1,54,999',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // New arrivals & best deals
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.featured).slice(0, 4);
  const bestDeals = PRODUCTS.filter((p) => p.isBestDeal).slice(0, 4);

  // Budget Pills
  const budgetTiers = [
    { label: 'Under ৳15,000', max: 15000 },
    { label: '৳15k - ৳30k', min: 15000, max: 30000 },
    { label: '৳30k - ৳60k', min: 30000, max: 60000 },
    { label: '৳60k - 1 Lakh', min: 60000, max: 100000 },
    { label: 'Above 1 Lakh', min: 100000 },
  ];

  const handleBudgetClick = (min?: number, max?: number) => {
    const params = new URLSearchParams();
    if (min !== undefined) params.set('min', min.toString());
    if (max !== undefined) params.set('max', max.toString());
    navigate(`/shop?${params.toString()}`);
  };

  const flagshipOutlet = OUTLETS[0];

  return (
    <div className="space-y-14 md:space-y-20 pb-16">
      {/* 1. Hero Section: Clean minimal image slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="relative bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full items-center">
            {/* Slide Text Content */}
            <div className="p-6 sm:p-10 md:p-14 z-10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#1E5EFF] mb-2">
                Showroom Verified Hardware
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight leading-tight">
                {heroSlides[activeSlide].title}
              </h1>
              <p className="text-sm sm:text-base text-[#6B6B6B] mt-3 max-w-md leading-relaxed">
                {heroSlides[activeSlide].subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link to={heroSlides[activeSlide].link}>
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {heroSlides[activeSlide].cta}
                  </Button>
                </Link>
                <div className="text-left">
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] block">Official Price</span>
                  <span className="text-base sm:text-lg font-bold text-[#111111]">
                    {heroSlides[activeSlide].priceText}
                  </span>
                </div>
              </div>
            </div>

            {/* Slide Image */}
            <div className="relative h-64 md:h-full w-full bg-[#FAFAF8] flex items-center justify-center p-6 md:p-12">
              <img
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].title}
                className="max-h-[360px] max-w-full object-contain mix-blend-multiply transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-full bg-white/90 border border-[#E5E5E5] text-[#111111] flex items-center justify-center hover:bg-white shadow-xs cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === i ? 'w-6 bg-[#111111]' : 'w-2 bg-[#D4D4D0]'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-full bg-white/90 border border-[#E5E5E5] text-[#111111] flex items-center justify-center hover:bg-white shadow-xs cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip with Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-white border border-[#E5E5E5] rounded-xl">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#111111]">100% Original</h3>
              <p className="text-[11px] text-[#737373]">Official & verified seal</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#111111]">0% EMI Support</h3>
              <p className="text-[11px] text-[#737373]">Up to 12 months with 24 banks</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#111111]">Exchange Facility</h3>
              <p className="text-[11px] text-[#737373]">15-min showroom valuation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#111111]">Fast Delivery</h3>
              <p className="text-[11px] text-[#737373]">Same-day inside Dhaka</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#111111]">After-Sales Care</h3>
              <p className="text-[11px] text-[#737373]">Dedicated service counter</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
              Featured Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Select a category to explore phones, tablets, laptops and audio gear
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#1E5EFF] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white border border-[#E5E5E5] rounded-xl p-3 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="aspect-square w-full rounded-lg bg-[#FAFAF8] overflow-hidden mb-3 p-3 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-semibold text-[#111111] group-hover:text-[#1E5EFF] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#737373] mt-0.5">{cat.itemCount} devices</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1E5EFF]">
              Just Landed
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="text-xs font-semibold text-[#1E5EFF] hover:underline flex items-center gap-1"
          >
            <span>Browse New</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Best Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1E5EFF]">
              Special Offers
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
              Best Deals in Store
            </h2>
          </div>
          <Link
            to="/offers"
            className="text-xs font-semibold text-[#1E5EFF] hover:underline flex items-center gap-1"
          >
            <span>All Deals</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {bestDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Shop by Budget Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8">
          <div className="max-w-xl mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
              Shop by Your Budget
            </h2>
            <p className="text-xs text-[#737373] mt-1">
              Select your price bracket to see phones and gadgets fitting your pocket.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {budgetTiers.map((tier) => (
              <button
                key={tier.label}
                onClick={() => handleBudgetClick(tier.min, tier.max)}
                className="px-4 py-2 bg-[#FAFAF8] hover:bg-[#111111] hover:text-white border border-[#E5E5E5] hover:border-[#111111] text-xs font-semibold text-[#111111] rounded-full transition-all cursor-pointer active:scale-95"
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Top Brands Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[#737373]">
            Authorized & Verified Brands
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="px-5 py-3 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#111111] transition-all text-xs font-bold text-[#111111] hover:text-[#1E5EFF] flex items-center gap-2 shadow-2xs"
            >
              <span>{brand.name}</span>
              <span className="text-[10px] font-normal text-[#A3A3A3]">
                ({brand.count})
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. "Visit Our Store" Showroom Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Showroom Photo */}
            <div className="relative min-h-[300px] lg:min-h-[420px] bg-[#FAFAF8]">
              <img
                src={flagshipOutlet.image}
                alt="SIZANBD Bashundhara City Flagship Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                Flagship Experience Center
              </div>
            </div>

            {/* Showroom Details & Timings */}
            <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1E5EFF]">
                  Physical Outlets
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                  Visit Our Showroom Before You Buy
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2.5 leading-relaxed">
                  We believe touch, feel, and verified box opening matter most when buying valuable technology.
                  Visit our Bashundhara City flagship or Jamuna Future Park branch, check the IMEI on the spot,
                  and let our team configure your device.
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-[#4A4A4A] bg-[#FAFAF8] p-4 rounded-xl border border-[#E5E5E5]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">{flagshipOutlet.name}</strong>
                    <span>{flagshipOutlet.floor}, {flagshipOutlet.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#1E5EFF] shrink-0" />
                  <div>
                    <span className="text-[#111111] font-medium">{flagshipOutlet.hours}</span>
                    <span className="block text-[#737373] text-[11px]">{flagshipOutlet.fridayHours}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/stores">
                  <Button variant="primary" size="md">
                    View All 4 Showrooms
                  </Button>
                </Link>
                <a
                  href={flagshipOutlet.mapDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="md"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    Google Map Directions
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Short Honest "Why Buy From SIZANBD" Text Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAFAF8] border border-[#E5E5E5] rounded-2xl p-6 sm:p-10 text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
            Why Buy From SIZANBD?
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] mt-3 leading-relaxed">
            Original devices. Real warranty. Come check them in our shop before you buy.
            We don't sell refurbished phones disguised as new, we don't hide IMEI numbers, and we never push products you don't need.
            Not sure which phone fits your budget? Call our hotline at <span className="font-semibold text-[#111111]">09612-404040</span> — we'll help you pick honestly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#737373]">
            <div>
              <strong className="text-lg font-black text-[#111111] block">10+ Years</strong>
              <span>Serving Gadget Lovers</span>
            </div>
            <div className="w-px h-8 bg-[#E5E5E5]" />
            <div>
              <strong className="text-lg font-black text-[#111111] block">4 Showrooms</strong>
              <span>Across Dhaka City</span>
            </div>
            <div className="w-px h-8 bg-[#E5E5E5]" />
            <div>
              <strong className="text-lg font-black text-[#111111] block">50,000+</strong>
              <span>Satisfied Customers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
