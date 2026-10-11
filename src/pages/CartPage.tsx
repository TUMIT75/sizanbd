import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { formatBDT } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { SafeImage } from '../components/common/SafeImage';
import { EmptyState } from '../components/common/EmptyState';
import { PaymentLogosRow } from '../components/common/PaymentLogos';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    couponCode,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    getCartSubtotal,
    getCartDiscount,
    getDeliveryCost,
    getCartTotal,
    toggleWishlist,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const delivery = getDeliveryCost();
  const total = getCartTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;

    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  const handleSaveForLater = (productId: string, cartItemId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      toggleWishlist(product);
    }
    removeFromCart(cartItemId);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} className="mb-6" />
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping bag is empty"
          description="Looking for flagship phones, Apple MacBooks, or original charging accessories? Check out what’s in stock."
          actionLabel="Continue Shopping"
          onAction={() => navigate('/shop')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
          <p className="text-xs text-[#737373] mt-0.5">
            Prices include VAT. Showroom pickup available at checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#737373] hover:text-red-600 transition-colors cursor-pointer"
        >
          Clear all items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Line Items List (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E5E5] rounded-xl overflow-hidden divide-y divide-[#F0F0EE]">
          {cart.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                to={`/product/${item.slug}`}
                className="w-20 h-20 bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg p-2 shrink-0 flex items-center justify-center"
              >
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-semibold text-[#737373] tracking-wider">
                  {item.brand} · {item.status}
                </span>
                <Link
                  to={`/product/${item.slug}`}
                  className="text-sm font-bold text-[#111111] hover:text-[#1E5EFF] transition-colors block truncate"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-[#737373] mt-0.5">
                  Variant: <span className="text-[#111111]">{item.variantName}</span>
                </p>

                <div className="flex items-center gap-4 mt-3 text-xs">
                  <button
                    onClick={() => handleSaveForLater(item.productId, item.id)}
                    className="text-[#737373] hover:text-[#111111] flex items-center gap-1 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Save for later</span>
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#A3A3A3] hover:text-red-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Quantity selector & line price */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                <div className="flex items-center border border-[#E5E5E5] rounded-md bg-[#FAFAF8] overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#737373] hover:text-[#111111] hover:bg-[#EAEAE8] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#111111]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#737373] hover:text-[#111111] hover:bg-[#EAEAE8] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm sm:text-base font-extrabold text-[#111111] block">
                    {formatBDT(item.price * item.quantity)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[11px] text-[#737373]">
                      {formatBDT(item.price)} each
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Order Summary
            </h2>

            {/* Subtotal & calculations */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#737373]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#111111]">{formatBDT(subtotal)}</span>
              </div>

              {couponDiscountPercent > 0 && (
                <div className="flex justify-between text-[#1E5EFF] font-medium">
                  <span>Coupon Discount ({couponDiscountPercent}%)</span>
                  <span>-{formatBDT(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#737373]">
                <span>Estimated Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="pt-3 border-t border-[#E5E5E5] flex justify-between text-base font-extrabold text-[#111111]">
                <span>Total Amount</span>
                <span>{formatBDT(total)}</span>
              </div>
            </div>

            {/* Coupon field */}
            <div className="pt-2">
              {couponCode ? (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#1E5EFF] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{couponCode} (-{couponDiscountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#737373] hover:text-red-600 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. SIZAN10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 rounded-lg border border-[#E5E5E5] text-xs px-3 py-2 uppercase placeholder:normal-case outline-none focus:border-[#111111]"
                    />
                    <Button variant="secondary" size="sm" type="submit">
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600">{couponError}</p>
                  )}
                  <p className="text-[11px] text-[#A3A3A3]">
                    Use code <strong className="text-[#111111]">SIZAN10</strong> for 10% off
                  </p>
                </form>
              )}
            </div>

            {/* Checkout CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>

            <div className="pt-2 text-[11px] text-[#737373] flex items-center gap-2 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official invoice with printed IMEI generated</span>
            </div>

            <div className="pt-3 border-t border-[#E5E5E5]/70">
              <PaymentLogosRow variant="light" compact showTitle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
