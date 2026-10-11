import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatBDT } from '../utils/formatters';
import { CheckCircle2, Truck, ShoppingBag, ArrowRight, Phone } from 'lucide-react';
import { Button } from '../components/common/Button';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId') || 'SZ-2026-92144';

  const { orders } = useStore();
  const order = orders.find((o) => o.orderId === orderId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-8">
      {/* Success Badge */}
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
          Thank you for trusting SIZANBD!
        </h1>
        <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-lg mx-auto leading-relaxed">
          Your order has been recorded. Our showroom support team will call you shortly to confirm package seal inspection before dispatch.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 text-left space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0F0EE] gap-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#737373] block">
              Order Tracking ID
            </span>
            <span className="text-lg font-mono font-bold text-[#111111]">
              {orderId}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] text-[#737373] block">Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E5EFF]">
              <span className="w-2 h-2 rounded-full bg-[#1E5EFF] animate-pulse" />
              Order Placed & Queued
            </span>
          </div>
        </div>

        {order && (
          <div className="space-y-4 text-xs">
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[#737373] block">Customer:</span>
                <strong className="text-[#111111]">{order.customerName}</strong>
                <span className="block text-[#737373]">{order.phone}</span>
              </div>

              <div>
                <span className="text-[#737373] block">Delivery Location:</span>
                <strong className="text-[#111111]">{order.deliveryMethod === 'store_pickup' ? order.outletPickup : `${order.thana}, ${order.district}`}</strong>
                <span className="block text-[#737373]">{order.address}</span>
              </div>
            </div>

            {/* Items */}
            <div className="pt-3 border-t border-[#F0F0EE]">
              <span className="font-bold text-[#111111] block mb-2">Ordered Items:</span>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="text-[#4A4A4A]">
                      {item.title} ({item.variantName}) × {item.quantity}
                    </span>
                    <span className="font-semibold text-[#111111]">
                      {formatBDT(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-[#F0F0EE] flex justify-between font-bold text-sm text-[#111111]">
              <span>Grand Total</span>
              <span>{formatBDT(order.total)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to={`/track-order?id=${encodeURIComponent(orderId)}`}>
          <Button variant="primary" size="lg" rightIcon={<Truck className="w-4 h-4" />}>
            Track Order Status
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" size="lg" leftIcon={<ShoppingBag className="w-4 h-4" />}>
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="text-xs text-[#737373] pt-4">
        Need assistance with this order? Call our hotline directly at{' '}
        <a href="tel:09612404040" className="font-bold text-[#111111] hover:underline">
          09612-404040
        </a>
      </div>
    </div>
  );
};
