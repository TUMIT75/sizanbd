import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SafeImage } from '../common/SafeImage';
import { formatBDT } from '../../utils/formatters';
import { ArrowRight, Store, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  desc: string;
  price: number;
  emiMonths: number;
  productSlug: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-s25',
    badge: 'New at SIZANBD',
    title: 'Galaxy S25 Ultra is here. Come try it in store.',
    desc: 'Flat titanium sides, Snapdragon 8 Elite, and anti-reflective Gorilla Armor. Test the S-Pen before you buy.',
    price: 154999,
    emiMonths: 12,
    productSlug: 'samsung-galaxy-s25-ultra',
    image: '/images/hero/hero-galaxy-s26.jpg',
  },
  {
    id: 'slide-ip16',
    badge: 'Official Warranty',
    title: 'iPhone 16 Pro Max. Aerospace titanium with A18 Pro.',
    desc: 'Camera Control button, grade 5 titanium, and battery that easily lasts 30+ hours. Factory sealed with IMEI check.',
    price: 169999,
    emiMonths: 12,
    productSlug: 'apple-iphone-16-pro-max',
    image: '/images/hero/hero-iphone-16.jpg',
  },
  {
    id: 'slide-mba',
    badge: 'MacBook Power',
    title: 'MacBook Air M3. Silent, fanless power all day long.',
    desc: '18 hours battery life for heavy coding, office spreadsheets, and university work. Available in Midnight & Starlight.',
    price: 134500,
    emiMonths: 12,
    productSlug: 'apple-macbook-air-m3-13-inch',
    image: '/images/hero/hero-macbook-m3.jpg',
  },
];

const CATEGORY_SHORTCUTS = [
  { name: 'Phones', slug: 'phones', image: '/images/categories/phones.jpg', count: '9 Models' },
  { name: 'Laptops', slug: 'laptops', image: '/images/categories/laptops.jpg', count: '8 Models' },
  { name: 'Audio', slug: 'audio', image: '/images/categories/audio.jpg', count: '8 Models' },
  { name: 'Wearables', slug: 'wearables', image: '/images/categories/wearables.jpg', count: '8 Models' },
  { name: 'Accessories', slug: 'accessories', image: '/images/categories/accessories.jpg', count: '8 Models' },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const slideDuration = 6000; // 6 seconds

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, slideDuration);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // swipe left -> next slide
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -50) {
      // swipe right -> previous slide
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
    setTouchStart(null);
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section className="space-y-6">
      {/* 1. Main Editorial Hero Split */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden min-h-[460px] md:min-h-[500px] flex flex-col-reverse md:flex-row transition-all touch-pan-y"
      >
        {/* Left Side (45%): Text & CTA */}
        <div className="w-full md:w-[45%] p-6 sm:p-10 md:p-12 flex flex-col justify-between z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FAFAF8] border border-[#E5E5E5] rounded-md text-[11px] font-heading font-semibold text-[#1E5EFF] tracking-wide uppercase mb-4">
              <span>{active.badge}</span>
            </div>

            <h1
              key={`title-${currentSlide}`}
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.18] transition-all duration-300"
            >
              {active.title}
            </h1>

            <p
              key={`desc-${currentSlide}`}
              className="text-xs sm:text-sm font-body text-[#6B6B6B] mt-3 leading-relaxed max-w-md transition-all duration-300"
            >
              {active.desc}
            </p>
          </div>

          <div className="mt-6 md:mt-8 pt-4 border-t border-[#F0F0EE] space-y-4">
            <div>
              <span className="text-[11px] text-[#737373] block uppercase tracking-wider font-medium">
                Official In-Stock Price
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-heading font-bold text-[#111111]">
                  From {formatBDT(active.price)}
                </span>
                <span className="text-xs font-body text-[#737373]">
                  · EMI from {formatBDT(Math.ceil(active.price / active.emiMonths))}/mo with 30+ banks
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to={`/product/${active.productSlug}`}>
                <button className="px-5 py-2.5 bg-[#111111] hover:bg-[#262626] text-white text-xs font-heading font-bold rounded-lg transition-all active:scale-[0.98] flex items-center gap-1.5 cursor-pointer">
                  <span>Buy now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <Link to="/stores">
                <button className="px-5 py-2.5 bg-transparent hover:bg-[#F5F5F3] border border-[#E5E5E5] hover:border-[#CCCCCC] text-[#111111] text-xs font-heading font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer">
                  <Store className="w-3.5 h-3.5" />
                  <span>Visit showroom</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side (55%): Clean Image on soft background */}
        <div className="w-full md:w-[55%] bg-[#FAFAF8] p-6 sm:p-10 flex items-center justify-center relative min-h-[260px] md:min-h-full">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <SafeImage
              key={`img-${currentSlide}`}
              src={active.image}
              alt={active.title}
              priority
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-opacity duration-500"
            />
          </div>

          {/* Slide Progress Bars */}
          <div className="absolute bottom-4 right-4 sm:right-6 flex items-center gap-2 z-20">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className="group p-1 cursor-pointer"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className="w-8 sm:w-12 h-1 bg-[#E0E0DD] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#111111] transition-all duration-300 ${
                        isCurrent ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Slim Row of 5 Category Shortcuts with Real Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORY_SHORTCUTS.map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group bg-white border border-[#E5E5E5] hover:border-[#111111] rounded-xl p-3 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xs"
          >
            <div className="w-12 h-12 bg-[#FAFAF8] rounded-lg p-1.5 border border-[#E5E5E5] shrink-0 flex items-center justify-center">
              <SafeImage
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-heading font-bold text-[#111111] group-hover:text-[#1E5EFF] transition-colors truncate">
                {cat.name}
              </h3>
              <span className="text-[10px] font-body text-[#737373] block mt-0.5">
                {cat.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
