import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatBDT } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { Badge } from '../components/common/Badge';
import { SafeImage } from '../components/common/SafeImage';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleMoveToCart = (product: any) => {
    const primary = product.variants[0] || {
      id: 'default',
      name: 'Standard',
      colorName: 'Standard',
      price: product.price,
      regularPrice: product.regularPrice,
    };

    addToCart(
      {
        id: `${product.id}-${primary.id}`,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        brand: product.brand,
        image: product.thumbnail,
        variantId: primary.id,
        variantName: primary.name,
        colorName: primary.colorName,
        storage: primary.storage,
        price: primary.price,
        regularPrice: primary.regularPrice,
        status: product.status,
      },
      1
    );

    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumb items={[{ label: 'Saved Wishlist' }]} className="mb-6" />
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save smartphones, laptops, or earbuds here to track price drops and showroom stock availability."
          actionLabel="Explore Devices"
          onAction={() => navigate('/shop')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
          My Saved Items ({wishlist.length})
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Items saved in your browser. Prices and stock update automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#E5E5E5] rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-xs"
          >
            <div>
              <div className="relative aspect-square w-full rounded-lg bg-[#FAFAF8] overflow-hidden p-4 mb-3 flex items-center justify-center">
                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                  <SafeImage
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 text-[#A3A3A3] hover:text-red-600 p-1 rounded-full bg-white border border-[#E5E5E5] transition-colors z-20 cursor-pointer"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-[#737373] uppercase">
                  {product.brand}
                </span>
                <Badge type="status" value={product.status} />
              </div>

              <Link
                to={`/product/${product.slug}`}
                className="text-sm font-bold text-[#111111] hover:text-[#1E5EFF] block line-clamp-2 min-h-[2.5rem]"
              >
                {product.title}
              </Link>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F0F0EE] space-y-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-base font-extrabold text-[#111111]">
                  {formatBDT(product.price)}
                </span>
                {product.regularPrice > product.price && (
                  <span className="text-xs text-[#737373] line-through font-normal">
                    {formatBDT(product.regularPrice)}
                  </span>
                )}
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => handleMoveToCart(product)}
                leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
              >
                Move to Bag
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
