import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductVariant } from '../types';
import { useStore } from '../store/useStore';
import { formatBDT, calculateEMI } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SafeImage } from '../components/common/SafeImage';
import { PaymentLogosRow } from '../components/common/PaymentLogos';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { VariantSelector } from '../components/product/VariantSelector';
import { SpecTable } from '../components/product/SpecTable';
import { ProductReviews } from '../components/product/ProductReviews';
import { ProductCard } from '../components/product/ProductCard';
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  Heart,
  Scale,
  ShoppingBag,
  Zap,
  Building2,
  Check,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
    addRecentlyViewed,
    recentlyViewed,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'warranty' | 'reviews'>('specs');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Update selected variant & image when product changes
  useEffect(() => {
    if (product) {
      const defaultVar = product.variants[0] || null;
      setSelectedVariant(defaultVar);
      setActiveImage(product.images[0] || product.thumbnail);
      setQuantity(1);
      addRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-[#111111]">Product Not Found</h1>
        <p className="text-xs text-[#737373] mt-2 mb-6">
          The requested device may be out of stock or renamed.
        </p>
        <Link to="/shop">
          <Button variant="primary">Explore Available Gadgets</Button>
        </Link>
      </div>
    );
  }

  const currentVariant = selectedVariant || product.variants[0] || {
    id: 'default',
    name: 'Standard',
    colorName: 'Standard',
    colorHex: '#000',
    price: product.price,
    regularPrice: product.regularPrice,
    inStock: true,
  };

  const currentPrice = currentVariant.price;
  const currentRegularPrice = currentVariant.regularPrice;
  const hasDiscount = currentRegularPrice > currentPrice;
  const discountAmount = hasDiscount ? currentRegularPrice - currentPrice : 0;

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Handle Add to Cart
  const handleAddToCart = () => {
    addToCart(
      {
        id: `${product.id}-${currentVariant.id}`,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        brand: product.brand,
        image: activeImage,
        variantId: currentVariant.id,
        variantName: currentVariant.name,
        colorName: currentVariant.colorName,
        storage: currentVariant.storage,
        price: currentPrice,
        regularPrice: currentRegularPrice,
        status: product.status,
      },
      quantity
    );
  };

  // Handle Buy Now (direct to checkout)
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  // Recently viewed excluding current
  const otherRecentlyViewed = recentlyViewed
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Handle hover zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* 1. Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.categoryName, href: `/category/${product.categorySlug}` },
          { label: product.title },
        ]}
      />

      {/* 2. Main Product Hero (Gallery + Purchase Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Image Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div
            className="relative aspect-square w-full bg-white border border-[#E5E5E5] rounded-xl overflow-hidden p-6 flex items-center justify-center cursor-crosshair select-none"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <SafeImage
              src={activeImage}
              alt={product.title}
              priority
              className={`max-h-full max-w-full object-contain transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                  : undefined
              }
            />

            {/* Badges on Gallery */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-20">
              <Badge type="status" value={product.status} />
              {hasDiscount && (
                <span className="text-[11px] font-bold text-white bg-[#1E5EFF] px-2 py-0.5 rounded-sm">
                  {formatBDT(discountAmount)} OFF
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] text-[#A3A3A3] bg-white/80 px-2 py-0.5 rounded pointer-events-none z-20">
              Hover to zoom
            </div>
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-lg border p-1 bg-white shrink-0 transition-all cursor-pointer ${
                    activeImage === img
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.title} thumb ${idx}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#737373] mb-1.5">
              <span className="font-semibold text-[#111111] uppercase tracking-wider">
                {product.brand}
              </span>
              <span>·</span>
              <span>SKU: {product.sku}</span>
              <span>·</span>
              <Badge type="stock" value={product.stockStatus} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
              {product.title}
            </h1>

            {/* Ratings & reviews count */}
            <div className="flex items-center gap-3 mt-2 text-xs text-[#737373]">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#111111]">{product.rating}</span>
              </div>
              <span>·</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="hover:underline hover:text-[#111111] cursor-pointer"
              >
                {product.reviewCount} customer reviews
              </button>
              <span>·</span>
              <span className="text-emerald-700 font-medium">Original Verified</span>
            </div>
          </div>

          {/* Price & EMI Box */}
          <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                {formatBDT(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-[#737373] line-through font-normal">
                  {formatBDT(currentRegularPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#737373] pt-1 border-t border-[#F0F0EE]">
              <Zap className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span>
                EMI starting from <strong className="text-[#111111]">{calculateEMI(currentPrice, 12)}/month</strong> (Up to 12 months with 24 banks)
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Variants selector */}
          {product.variants.length > 0 && (
            <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl">
              <VariantSelector
                variants={product.variants}
                selectedVariant={currentVariant}
                onSelectVariant={(v) => setSelectedVariant(v)}
              />
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#111111]">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onChange={(q) => setQuantity(q)}
              />
              <span className="text-xs text-[#737373] ml-auto">
                {product.stockStatus === 'In stock' ? 'Ready to ship' : 'Pre-order available'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                fullWidth
              >
                Add to Bag
              </Button>
              <Button
                variant="accent"
                size="lg"
                onClick={handleBuyNow}
                leftIcon={<Zap className="w-4 h-4" />}
                fullWidth
              >
                Buy Now
              </Button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isSaved ? 'text-rose-600 font-semibold' : 'text-[#737373] hover:text-[#111111]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isCompared ? 'text-[#1E5EFF] font-semibold' : 'text-[#737373] hover:text-[#111111]'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'In Compare Table' : 'Add to Compare'}</span>
                </button>
              </div>

              {/* Ask on WhatsApp */}
              <a
                href={`https://wa.me/8801711234567?text=Hello%20SIZANBD,%20I%20have%20a%20question%20about%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Delivery & Showroom Info Box */}
          <div className="p-4 bg-[#FAFAF8] border border-[#E5E5E5] rounded-xl space-y-3 text-xs text-[#4A4A4A]">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111] block">Doorstep Delivery</strong>
                <span>Inside Dhaka: ৳80 (Same day or 24 hours) · Outside Dhaka: ৳150 (2-4 days)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111] block">Physical Showroom Pickup (Free)</strong>
                <span>Available today at Bashundhara City, Jamuna Future Park, Dhanmondi, Uttara.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111] block">Warranty Guarantee</strong>
                <span>{product.warranty.official} · {product.warranty.parts}</span>
              </div>
            </div>

            {/* Accepted Payments with official brand logos */}
            <div className="pt-2.5 border-t border-[#E5E5E5]/70">
              <PaymentLogosRow variant="light" compact showTitle />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Tabs (Specs, Description, Warranty, Reviews) */}
      <div className="pt-6 border-t border-[#E5E5E5]">
        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-px overflow-x-auto">
          {[
            { id: 'specs', label: 'Specifications' },
            { id: 'description', label: 'Description & Details' },
            { id: 'warranty', label: 'Warranty & Support' },
            { id: 'reviews', label: `Reviews (${product.reviews.length})` },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-[#737373] hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === 'specs' && (
            <SpecTable
              specs={product.specs}
              brand={product.brand}
              sku={product.sku}
              status={product.status}
            />
          )}

          {activeTab === 'description' && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-4 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              <h3 className="text-base font-bold text-[#111111]">
                About {product.title}
              </h3>
              <p>{product.fullDescription}</p>

              <div className="pt-4 border-t border-[#F0F0EE]">
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                  What’s Inside The Box
                </h4>
                <ul className="space-y-1.5 text-xs text-[#737373]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Original factory-sealed {product.title}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>USB-C charging cable / documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SIZANBD official purchase invoice with printed IMEI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official warranty registration card</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-4 text-xs sm:text-sm text-[#4A4A4A]">
              <h3 className="text-base font-bold text-[#111111]">
                Warranty & After-Sales Policy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg">
                  <h4 className="text-xs font-bold text-[#111111]">Manufacturer Coverage</h4>
                  <p className="text-xs text-[#737373] mt-1">{product.warranty.official}</p>
                </div>
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg">
                  <h4 className="text-xs font-bold text-[#111111]">Hardware & Screen</h4>
                  <p className="text-xs text-[#737373] mt-1">{product.warranty.parts}</p>
                </div>
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg">
                  <h4 className="text-xs font-bold text-[#111111]">Service Support</h4>
                  <p className="text-xs text-[#737373] mt-1">{product.warranty.service}</p>
                </div>
              </div>
              <p className="text-xs text-[#737373] leading-relaxed pt-2">
                You can claim warranty directly at any authorized brand service point in Bangladesh, or bring the device to any SIZANBD showroom in Bashundhara City or Jamuna Future Park for assisted claim management.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <ProductReviews
              initialReviews={product.reviews}
              productTitle={product.title}
            />
          )}
        </div>
      </div>

      {/* 4. Related Products Row */}
      {relatedProducts.length > 0 && (
        <div className="pt-6 space-y-4">
          <h2 className="text-lg font-bold text-[#111111]">
            Related in {product.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* 5. Recently Viewed Row */}
      {otherRecentlyViewed.length > 0 && (
        <div className="pt-6 space-y-4">
          <h2 className="text-lg font-bold text-[#111111]">
            Recently Viewed Devices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherRecentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* 6. Sticky "Add to Cart" Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E5E5] p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-[#737373] block truncate max-w-[140px]">
            {product.title}
          </span>
          <span className="text-base font-bold text-[#111111]">
            {formatBDT(currentPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Add to Bag
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
