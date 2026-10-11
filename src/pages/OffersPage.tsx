import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { formatBDT } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/common/Button';
import { useStore } from '../store/useStore';
import { Tag, Copy, Check, Sparkles, CreditCard, RefreshCw, Gift } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { addToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons = [
    {
      code: 'SIZAN10',
      title: '10% Flat Subtotal Discount',
      desc: 'Valid on accessories, audio gear, and select smartphones. No minimum order limit.',
      expiry: 'Valid till 31 Oct 2026',
    },
    {
      code: 'WELCOME5',
      title: '5% First Order Welcome Voucher',
      desc: 'Save 5% on your first online checkout with SIZANBD.',
      expiry: 'Ongoing Promotion',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast('Code Copied!', `Coupon "${code}" copied to clipboard.`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Best deals & pre-orders
  const dealProducts = PRODUCTS.filter((p) => p.isBestDeal);
  const preOrderProducts = PRODUCTS.filter((p) => p.stockStatus === 'Pre-order');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Offers & Campaigns' }]} />

      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF]">
          Promotions & Deals
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-0.5">
          Current Offers & Discount Coupons
        </h1>
        <p className="text-xs sm:text-sm text-[#737373] mt-1 max-w-xl">
          Verified discount codes and showroom campaigns available this week at SIZANBD.
        </p>
      </div>

      {/* 1. Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="p-5 bg-white border border-[#E5E5E5] rounded-xl flex flex-col justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1E5EFF] px-2 py-0.5 rounded">
                  <Tag className="w-3 h-3" />
                  Active Voucher
                </span>
                <h3 className="text-base font-bold text-[#111111] mt-2">
                  {coupon.title}
                </h3>
                <p className="text-xs text-[#737373] mt-1">{coupon.desc}</p>
              </div>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF8] hover:bg-[#111111] hover:text-white border border-[#E5E5E5] hover:border-[#111111] text-xs font-mono font-bold text-[#111111] rounded-lg transition-all shrink-0 cursor-pointer"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{coupon.code}</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 border-t border-[#F0F0EE] text-[11px] text-[#A3A3A3] flex justify-between">
              <span>{coupon.expiry}</span>
              <span className="text-[#1E5EFF]">Use at checkout</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Ongoing Campaigns Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-[#1E5EFF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-[#111111]">0% EMI up to 12 Months</h4>
            <p className="text-[11px] text-[#737373] mt-0.5">
              Available with 24 major Bangladeshi bank credit cards online and at showroom counters.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl flex items-start gap-3">
          <RefreshCw className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-[#111111]">Exchange Valuation Bonus</h4>
            <p className="text-[11px] text-[#737373] mt-0.5">
              Get an extra ৳2,000 top-up when trading in older iPhone or Galaxy devices in our showroom.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl flex items-start gap-3">
          <Gift className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-[#111111]">Free 9H Glass Installation</h4>
            <p className="text-[11px] text-[#737373] mt-0.5">
              Complimentary tempered glass installed bubble-free with every smartphone purchase in store.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Discounted Deals Product Showcase */}
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#111111] tracking-tight">
              Special Discounted Stock
            </h2>
            <p className="text-xs text-[#737373] mt-0.5">
              Genuine devices with limited-time promotional pricing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
