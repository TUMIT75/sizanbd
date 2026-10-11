import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { formatBDT } from '../../utils/formatters';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartDiscount,
    getCartTotal,
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartDrawerOpen(false);
    };
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const total = getCartTotal();

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Cart Drawer"
          className="w-screen max-w-md bg-white border-l border-[#E5E5E5] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#111111]" />
              <h2 className="text-base font-semibold text-[#111111]">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#737373] hover:text-[#111111] rounded-md transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[#F0F0EE]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#737373] mb-3">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-[#111111]">Your bag is empty</h3>
                <p className="text-xs text-[#737373] max-w-[240px] mt-1 mb-5">
                  Explore phones, laptops, and original accessories.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-3 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-18 h-18 object-cover rounded-lg border border-[#E5E5E5] shrink-0 bg-[#FAFAF8]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-semibold text-[#111111] truncate">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A3A3A3] hover:text-red-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#737373] mt-0.5 truncate">
                      {item.variantName}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E5E5E5] rounded-md overflow-hidden bg-[#FAFAF8]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#737373] hover:text-[#111111] hover:bg-[#EAEAE8] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#737373] hover:text-[#111111] hover:bg-[#EAEAE8] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#111111]">
                        {formatBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer summary */}
          {cart.length > 0 && (
            <div className="px-5 py-4 border-t border-[#E5E5E5] bg-[#FAFAF8] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#737373]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111111]">{formatBDT(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#1E5EFF]">
                    <span>Coupon Discount</span>
                    <span>-{formatBDT(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#737373]">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E5E5E5]">
                  <span>Estimated Total</span>
                  <span>{formatBDT(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button variant="outline" size="md" onClick={handleViewCart}>
                  View Bag
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCheckout}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Checkout
                </Button>
              </div>

              <p className="text-[11px] text-center text-[#737373]">
                Free showroom pickup or same-day delivery in Dhaka
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
