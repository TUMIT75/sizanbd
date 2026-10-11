import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { OUTLETS } from '../data/outlets';
import { formatBDT, isValidBDPhone, generateOrderId } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import {
  Truck,
  Building2,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

const BD_DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

const DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Faridpur', 'Narsingdi'],
  Chattogram: ['Chattogram', 'Cox\'s Bazar', 'Cumilla', 'Feni', 'Noakhali', 'Brahmanbaria'],
  Rajshahi: ['Rajshahi', 'Bogura', 'Pabna', 'Sirajganj', 'Naogaon', 'Natore'],
  Khulna: ['Khulna', 'Jashore', 'Kushtia', 'Satkhira', 'Jhenaidah'],
  Barishal: ['Barishal', 'Patuakhali', 'Bhola', 'Pirojpur'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    deliveryMethod,
    setDeliveryMethod,
    selectedOutlet,
    setSelectedOutlet,
    getCartSubtotal,
    getCartDiscount,
    getDeliveryCost,
    getCartTotal,
    addOrder,
    addToast,
  } = useStore();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card' | 'emi'>('cod');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const delivery = getDeliveryCost();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-[#111111]">Your bag is empty</h1>
        <p className="text-xs text-[#737373] mt-2 mb-6">
          Add devices before proceeding to checkout.
        </p>
        <Link to="/shop">
          <Button variant="primary">Shop Products</Button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!isValidBDPhone(phone)) {
      errs.phone = 'Valid 11-digit BD mobile number (e.g. 01712345678) is required';
    }

    if (deliveryMethod !== 'store_pickup') {
      if (!thana.trim()) errs.thana = 'Area or Thana is required';
      if (!address.trim()) errs.address = 'Full street address is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder = {
        orderId,
        createdAt: new Date().toISOString(),
        customerName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        division,
        district,
        thana: thana.trim() || 'Store Pickup',
        address: address.trim() || `Pickup at ${selectedOutlet}`,
        deliveryMethod,
        paymentMethod,
        items: [...cart],
        subtotal,
        discount,
        deliveryCharge: delivery,
        total,
        status: 'Order Placed' as const,
        outletPickup: deliveryMethod === 'store_pickup' ? selectedOutlet : undefined,
        orderNote: orderNote.trim() || undefined,
      };

      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      navigate(`/order-success?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Bag', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
          Checkout & Order Confirmation
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Complete your information below. No hidden fees or automatic deductions.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3 Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Contact & Address */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F0F0EE] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm sm:text-base font-bold text-[#111111]">
                Customer Contact & Shipping Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Asif Mahmud"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                required
              />

              <Input
                label="Bangladeshi Mobile Number"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                helperText="We will send order confirmation SMS to this number"
                required
              />
            </div>

            <Input
              label="Email Address (Optional)"
              type="email"
              placeholder="e.g. asif@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="For digital invoice copy and tracking updates"
            />

            {/* Address fields (hidden if store pickup) */}
            {deliveryMethod !== 'store_pickup' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#111111] mb-1.5">
                      Division *
                    </label>
                    <select
                      value={division}
                      onChange={(e) => {
                        const div = e.target.value;
                        setDivision(div);
                        const dists = DISTRICTS_BY_DIVISION[div] || [];
                        setDistrict(dists[0] || div);
                      }}
                      className="w-full h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#111111] outline-none focus:border-[#111111]"
                    >
                      {BD_DIVISIONS.map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#111111] mb-1.5">
                      District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#111111] outline-none focus:border-[#111111]"
                    >
                      {(DISTRICTS_BY_DIVISION[division] || [division]).map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Area / Thana *"
                    placeholder="e.g. Dhanmondi, Uttara"
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    error={errors.thana}
                    required
                  />
                </div>

                <Input
                  label="Detailed Street Address *"
                  placeholder="House number, road number, apartment / floor details"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={errors.address}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#111111] mb-1.5">
                Order Notes / Special Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Call before delivery, gift wrap, preferred delivery time..."
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#E5E5E5] text-xs text-[#111111] p-3 outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          {/* STEP 2: Delivery Method */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F0F0EE] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm sm:text-base font-bold text-[#111111]">
                Delivery Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                onClick={() => setDeliveryMethod('inside_dhaka')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'inside_dhaka'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Truck className="w-4 h-4 text-[#1E5EFF]" />
                  <span className="text-xs font-bold text-[#111111]">৳80</span>
                </div>
                <p className="text-xs font-bold text-[#111111]">Inside Dhaka</p>
                <p className="text-[11px] text-[#737373] mt-0.5">1-2 working days (Same-day before 3 PM)</p>
              </label>

              <label
                onClick={() => setDeliveryMethod('outside_dhaka')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'outside_dhaka'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Truck className="w-4 h-4 text-[#1E5EFF]" />
                  <span className="text-xs font-bold text-[#111111]">৳150</span>
                </div>
                <p className="text-xs font-bold text-[#111111]">Outside Dhaka</p>
                <p className="text-[11px] text-[#737373] mt-0.5">3-5 days via Steadfast / Paperfly</p>
              </label>

              <label
                onClick={() => setDeliveryMethod('store_pickup')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'store_pickup'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">FREE</span>
                </div>
                <p className="text-xs font-bold text-[#111111]">Store Pickup</p>
                <p className="text-[11px] text-[#737373] mt-0.5">Collect at showroom</p>
              </label>
            </div>

            {/* Showroom selector if store pickup is chosen */}
            {deliveryMethod === 'store_pickup' && (
              <div className="p-3.5 bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg space-y-2">
                <label className="block text-xs font-semibold text-[#111111]">
                  Select Showroom Branch for Pickup:
                </label>
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-xs font-medium text-[#111111] outline-none focus:border-[#111111]"
                >
                  {OUTLETS.map((o) => (
                    <option key={o.id} value={o.name}>
                      {o.name} ({o.branch})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#737373]">
                  Your device will be packed and held securely at the service counter with your name.
                </p>
              </div>
            )}
          </div>

          {/* STEP 3: Payment Method */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F0F0EE] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-sm sm:text-base font-bold text-[#111111]">
                Payment Option
              </h2>
            </div>

            <div className="space-y-2.5">
              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs font-bold text-[#111111]">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    Pay in cash after inspecting parcel upon delivery inside Dhaka or at showroom.
                  </p>
                </div>
              </label>

              {/* bKash */}
              <label
                onClick={() => setPaymentMethod('bkash')}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs font-bold text-[#111111]">
                    bKash Online Payment
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    Fast automated payment via bKash payment gateway. Instant receipt issued.
                  </p>
                </div>
              </label>

              {/* Nagad */}
              <label
                onClick={() => setPaymentMethod('nagad')}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs font-bold text-[#111111]">
                    Nagad Digital Payment
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    Pay securely using your Nagad account credentials.
                  </p>
                </div>
              </label>

              {/* SSLCommerz (Card) */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs font-bold text-[#111111]">
                    Visa / Mastercard / AMEX (SSLCommerz)
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    Encrypted bank card payment with 3D Secure OTP verification.
                  </p>
                </div>
              </label>

              {/* EMI */}
              <label
                onClick={() => setPaymentMethod('emi')}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'emi'
                    ? 'border-[#111111] bg-[#FAFAF8] ring-1 ring-[#111111]'
                    : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'emi'}
                  onChange={() => setPaymentMethod('emi')}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs font-bold text-[#111111]">
                    0% Credit Card EMI (3, 6, 9, 12 Months)
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    Avail 0% interest with 24 partner banks in Bangladesh for carts above ৳15,000.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Order Summary (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider pb-2 border-b border-[#F0F0EE]">
              Order Summary ({cart.length} items)
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded object-contain border border-[#E5E5E5] p-1 shrink-0 bg-[#FAFAF8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#111111] truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#737373]">
                      Qty: {item.quantity} · {item.variantName}
                    </p>
                  </div>
                  <span className="font-bold text-[#111111] shrink-0">
                    {formatBDT(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost details */}
            <div className="pt-3 border-t border-[#F0F0EE] space-y-2 text-xs">
              <div className="flex justify-between text-[#737373]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111111]">{formatBDT(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#1E5EFF]">
                  <span>Discount</span>
                  <span>-{formatBDT(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#737373]">
                <span>Delivery</span>
                <span className="font-semibold text-[#111111]">
                  {delivery === 0 ? 'FREE (Pickup)' : formatBDT(delivery)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E5E5E5] flex justify-between text-base font-extrabold text-[#111111]">
                <span>Grand Total</span>
                <span>{formatBDT(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              leftIcon={<Lock className="w-4 h-4" />}
            >
              Place Order ({formatBDT(total)})
            </Button>

            <div className="text-[11px] text-center text-[#737373] space-y-1">
              <p>By placing order, you agree to SIZANBD terms.</p>
              <p className="flex items-center justify-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>10-day replacement warranty included</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
