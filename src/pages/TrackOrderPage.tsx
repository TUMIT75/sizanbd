import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatBDT } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import {
  Search,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  CheckCheck,
  AlertCircle,
  Phone,
} from 'lucide-react';

const TIMELINE_STEPS = [
  { id: 'Order Placed', label: 'Order Placed', desc: 'Order received in system' },
  { id: 'Confirmed', label: 'Confirmed', desc: 'Customer verified by phone' },
  { id: 'Packed', label: 'Packed & Sealed', desc: 'Box inspected & sealed with IMEI tag' },
  { id: 'Shipped', label: 'In Transit', desc: 'Handed over to courier service' },
  { id: 'Delivered', label: 'Delivered', desc: 'Handed over to recipient' },
];

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id') || '';

  const { orders, getOrderById } = useStore();

  const [orderIdInput, setOrderIdInput] = useState(urlId || 'SZ-2026-89412');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initial lookup if urlId is provided
  useEffect(() => {
    if (urlId) {
      const match = getOrderById(urlId);
      if (match) {
        setSearchedOrder(match);
        setHasSearched(true);
      }
    }
  }, [urlId]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setHasSearched(true);

    if (!orderIdInput.trim()) {
      setErrorMessage('Please enter your Order ID');
      return;
    }

    const found = getOrderById(orderIdInput, phoneInput || undefined);
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMessage(
        'Order ID not found. Please verify the ID or check the confirmation SMS.'
      );
    }
  };

  const getStepIndex = (status: string) => {
    return TIMELINE_STEPS.findIndex((s) => s.id === status);
  };

  const currentStepIdx = searchedOrder
    ? getStepIndex(searchedOrder.status)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Track Order' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
          Track Your Order
        </h1>
        <p className="text-xs text-[#737373]">
          Enter your order tracking ID (e.g. SZ-2026-89412) to see real-time showroom packing and transit progress.
        </p>
      </div>

      {/* Tracking Form */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 max-w-xl mx-auto shadow-2xs">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <Input
            label="Order Tracking ID"
            placeholder="e.g. SZ-2026-89412"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            required
          />

          <Input
            label="Mobile Phone Number (Optional verification)"
            placeholder="01XXXXXXXXX"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
          />

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button type="submit" variant="primary" size="md" fullWidth>
            Check Status
          </Button>
        </form>
      </div>

      {/* Result Display */}
      {searchedOrder && (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-8 animate-in fade-in duration-200 shadow-2xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0F0EE] gap-2">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#737373] block">
                Order Reference
              </span>
              <span className="text-lg font-mono font-bold text-[#111111]">
                {searchedOrder.orderId}
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[11px] text-[#737373] block">Current Stage</span>
              <span className="text-xs font-bold text-[#1E5EFF] px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md inline-block mt-0.5">
                {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* 5-Step Visual Timeline */}
          <div>
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-6">
              Fulfillment Timeline
            </h3>

            <div className="relative">
              {/* Desktop Progress Bar */}
              <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-[#E5E5E5] -z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2">
                {TIMELINE_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div
                      key={step.id}
                      className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 relative z-10"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                          isDone
                            ? 'bg-[#111111] text-white ring-4 ring-[#FAFAF8]'
                            : 'bg-white border-2 border-[#E5E5E5] text-[#A3A3A3]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div className="text-left sm:text-center">
                        <span
                          className={`text-xs block font-bold ${
                            isCurrent
                              ? 'text-[#1E5EFF]'
                              : isDone
                              ? 'text-[#111111]'
                              : 'text-[#A3A3A3]'
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[11px] text-[#737373] block mt-0.5">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Snapshot & Delivery Details */}
          <div className="pt-6 border-t border-[#F0F0EE] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-[#111111] block">
                Shipping Destination:
              </span>
              <p className="text-[#4A4A4A]">
                <strong>{searchedOrder.customerName}</strong> ({searchedOrder.phone})
              </p>
              <p className="text-[#737373]">
                {searchedOrder.address}, {searchedOrder.thana}, {searchedOrder.district}
              </p>
              <p className="text-[#737373]">
                Delivery Type: {searchedOrder.deliveryMethod === 'inside_dhaka' ? 'Inside Dhaka (Courier Rider)' : searchedOrder.deliveryMethod === 'outside_dhaka' ? 'Nationwide Courier' : 'Showroom Pickup'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[#111111] block">
                Items In Parcel:
              </span>
              <div className="space-y-1">
                {searchedOrder.items.map((it: any) => (
                  <div key={it.id} className="flex justify-between text-[#4A4A4A]">
                    <span>{it.title} × {it.quantity}</span>
                    <span className="font-semibold">{formatBDT(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#F0F0EE] flex justify-between font-bold text-sm text-[#111111]">
                <span>Total Amount</span>
                <span>{formatBDT(searchedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Hotline assistance */}
          <div className="p-4 bg-[#FAFAF8] rounded-lg border border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#737373]">
              Need to alter delivery address or change time?
            </span>
            <a
              href="tel:09612404040"
              className="font-bold text-[#111111] hover:text-[#1E5EFF] flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span>Call Showroom Dispatch: 09612-404040</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
