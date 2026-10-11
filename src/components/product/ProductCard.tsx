import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { formatBDT } from '../../utils/formatters';
import { Heart, Scale, ShoppingBag, Star } from 'lucide-react';
import { Badge } from '../common/Badge';
import { SafeImage } from '../common/SafeImage';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
  } = useStore();

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const hasDiscount = product.regularPrice > product.price;
  const discountAmount = hasDiscount ? product.regularPrice - product.price : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Pick first available variant or generate default
    const primaryVariant = product.variants[0] || {
      id: 'default',
      name: 'Standard',
      colorName: 'Standard',
      price: product.price,
      regularPrice: product.regularPrice,
    };

    addToCart(
      {
        id: `${product.id}-${primaryVariant.id}`,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        brand: product.brand,
        image: product.thumbnail,
        variantId: primaryVariant.id,
        variantName: primaryVariant.name,
        colorName: primaryVariant.colorName,
        storage: primaryVariant.storage,
        price: primaryVariant.price,
        regularPrice: primaryVariant.regularPrice,
        status: product.status,
      },
      1
    );
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white border border-[#E5E5E5] rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col sm:flex-row gap-4 items-center">
        {/* Thumbnail */}
        <Link
          to={`/product/${product.slug}`}
          className="relative w-full sm:w-48 h-44 shrink-0 rounded-lg overflow-hidden bg-[#FAFAF8] flex items-center justify-center p-3"
        >
          <SafeImage
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-[#1E5EFF] px-1.5 py-0.5 rounded-sm z-20">
              {formatBDT(discountAmount)} OFF
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-[#737373] font-medium">{product.brand}</span>
              <span className="text-[#CCCCCC]">·</span>
              <Badge type="status" value={product.status} />
              {product.condition === 'Pre-owned' && (
                <Badge type="condition" value={product.condition} />
              )}
            </div>

            <Link
              to={`/product/${product.slug}`}
              className="text-base font-semibold text-[#111111] hover:text-[#1E5EFF] transition-colors block line-clamp-1"
            >
              {product.title}
            </Link>

            <p className="text-xs text-[#737373] line-clamp-2 mt-1">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-1.5 mt-2 text-xs text-[#737373]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#111111]">{product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#F0F0EE]">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#111111]">
                  {formatBDT(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-[#737373] line-through">
                    {formatBDT(product.regularPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#737373]">
                EMI from {formatBDT(Math.ceil(product.price / 12))}/mo
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCompareClick}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isCompared
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#737373] border-[#E5E5E5] hover:text-[#111111]'
                }`}
                title="Compare"
                aria-label="Compare product"
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                onClick={handleWishlistClick}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-[#737373] border-[#E5E5E5] hover:text-[#111111]'
                }`}
                title="Wishlist"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleQuickAdd}
                className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-lg hover:bg-[#262626] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Standard)
  return (
    <div className="group relative bg-white border border-[#E5E5E5] rounded-xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
      {/* Top badges & action buttons */}
      <div>
        <div className="relative w-full aspect-square rounded-lg bg-[#FAFAF8] overflow-hidden p-4 mb-3 flex items-center justify-center">
          <Link
            to={`/product/${product.slug}`}
            className="w-full h-full flex items-center justify-center"
          >
            <SafeImage
              src={product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Discount Pill */}
          {hasDiscount && (
            <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white bg-[#1E5EFF] px-2 py-0.5 rounded-sm tracking-tight shadow-xs z-20">
              {formatBDT(discountAmount)} OFF
            </span>
          )}

          {/* Quick Actions (Wishlist & Compare) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-20">
            <button
              onClick={handleWishlistClick}
              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-white/90 backdrop-blur-xs text-[#737373] hover:text-[#111111] border border-[#E5E5E5]'
              }`}
              title="Add to wishlist"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCompareClick}
              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-[#111111] text-white'
                  : 'bg-white/90 backdrop-blur-xs text-[#737373] hover:text-[#111111] border border-[#E5E5E5]'
              }`}
              title="Compare"
              aria-label="Compare device"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-[11px] text-[#737373] mb-1">
          <span className="font-medium text-[#737373] uppercase tracking-wide">
            {product.brand}
          </span>
          <Badge type="status" value={product.status} />
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-sm font-semibold text-[#111111] hover:text-[#1E5EFF] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#737373]">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-[#111111]">{product.rating}</span>
          <span className="text-[11px]">({product.reviewCount})</span>
        </div>
      </div>

      {/* Pricing and Cart Button */}
      <div className="pt-3 mt-3 border-t border-[#F0F0EE]">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#111111]">
                {formatBDT(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#737373] line-through font-normal">
                  {formatBDT(product.regularPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#737373] mt-0.5">
              EMI from {formatBDT(Math.ceil(product.price / 12))}/mo
            </p>
          </div>
        </div>

        <button
          onClick={handleQuickAdd}
          className="w-full py-2 px-3 bg-[#111111] text-white hover:bg-[#262626] active:scale-[0.98] text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
