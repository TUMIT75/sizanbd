import React from 'react';

// ==========================================
// 1. bKash Brand Logo (Official Colors & Bird)
// ==========================================
export const BkashLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
  compact = false,
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#E2136E]/10 border border-[#E2136E]/30 shrink-0 ${className}`}
    title="bKash Mobile Financial Service"
  >
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 100 100" fill="none">
      {/* bKash iconic geometric origami bird symbol */}
      <path d="M50 8L88 38L62 48L50 8Z" fill="#E2136E" />
      <path d="M88 38L96 72L62 48L88 38Z" fill="#C00E5C" />
      <path d="M62 48L52 92L38 52L62 48Z" fill="#E2136E" />
      <path d="M38 52L4 64L32 38L38 52Z" fill="#C00E5C" />
      <path d="M32 38L50 8L38 52L32 38Z" fill="#E2136E" />
    </svg>
    {!compact && (
      <span className="text-[11px] font-extrabold text-[#E2136E] tracking-tight leading-none">
        bKash
      </span>
    )}
  </div>
);

// ==========================================
// 2. Nagad Brand Logo (Official Orange/Red Swirl)
// ==========================================
export const NagadLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
  compact = false,
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#F7941D]/10 border border-[#F7941D]/30 shrink-0 ${className}`}
    title="Nagad Digital Financial Service"
  >
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" fill="#ED1C24" />
      <path
        d="M28 58C28 42 42 28 58 28C74 28 80 42 74 54C68 66 54 68 44 64C36 60 34 52 38 46C42 40 48 40 52 44"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="58" cy="38" r="4" fill="#FDB813" />
    </svg>
    {!compact && (
      <span className="text-[11px] font-extrabold text-[#ED1C24] tracking-tight leading-none">
        Nagad
      </span>
    )}
  </div>
);

// ==========================================
// 3. Visa Brand Logo
// ==========================================
export const VisaLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
}) => (
  <div
    className={`inline-flex items-center justify-center px-2 py-1 rounded-md bg-white border border-[#1A1F71]/30 shrink-0 shadow-2xs ${className}`}
    title="Visa Debit & Credit Card"
  >
    <svg className="h-3.5 w-auto" viewBox="0 0 780 250" fill="none">
      <path
        fill="#1A1F71"
        d="M293.6 15.6L195.4 234.4h-64.2L68.8 61.2c-4.1-16.1-15.1-21.6-28.1-23.2H1.4l3.5 16.5c22.5 5.2 48.2 13.7 63.8 22.4 9.6 5.4 12.3 8.7 15.6 21.6l52.5 197.9h68.3L362 15.6h-68.4z"
      />
      <path
        fill="#1A1F71"
        d="M441.7 15.6l-51.2 218.8h64.7l51.2-218.8h-64.7zm249.2 69.8c-14.7-6.9-37.7-14.4-66.4-14.4-73.2 0-124.8 36.8-125.3 89.2-.5 39 37.1 60.7 65.1 73.7 28.7 13.3 38.3 21.8 38.2 33.7-.2 18.2-23.1 26.5-44.5 26.5-29.6 0-45.5-4.2-69.7-14.4l-9.6-4.4-10.4 46.4c13.7 6 39.1 11.2 65.4 11.4 77.8 0 128.5-36.4 129.1-92.8.3-30.9-19.4-54.4-62.1-73.9-25.9-12.5-41.8-20.9-41.6-33.6 0-11.3 13.3-23.3 42.1-23.3 24 0 41.5 4.8 55 10.4l6.6 3.1 10.1-45.1c-13.8-5.3-33-8.8-55.8-8.8l3.8 14.2z"
      />
      <path
        fill="#F7B600"
        d="M40.7 38c15.6 0 28.1 4.5 37.7 23.2l20.4 96.6-43.2-114.7c-3.1-4-8.3-5.1-14.9-5.1H1.4L0 44.5c22.5 0 35.5-6.5 40.7-6.5z"
      />
      <path
        fill="#1A1F71"
        d="M625.3 15.6h-50.1c-15.5 0-27.2 4.2-34 19.4L444.6 234.4h68.4s11.2-29.4 13.7-35.9c7.5 0 73.9.1 83.4.1 1.9 8.4 7.8 35.8 7.8 35.8h60.4L625.3 15.6zm-74.9 137.9c5.4-13.8 26-66.7 26-66.7-.3.5 5.3-13.8 8.6-22.9l4.4 20.3s12.5 57.3 15.1 69.3h-54.1z"
      />
    </svg>
  </div>
);

// ==========================================
// 4. Mastercard Brand Logo
// ==========================================
export const MastercardLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
  compact = false,
}) => (
  <div
    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-[#E5E5E5] shrink-0 shadow-2xs ${className}`}
    title="Mastercard Debit & Credit"
  >
    <svg className="h-4 w-6 shrink-0" viewBox="0 0 138 86" fill="none">
      <circle cx="43" cy="43" r="43" fill="#EB001B" />
      <circle cx="95" cy="43" r="43" fill="#F79E1B" />
      <path
        d="M69 13.4C79.8 23.7 86.8 37.9 86.8 53.6C86.8 69.3 79.8 83.5 69 93.8C58.2 83.5 51.2 69.3 51.2 53.6C51.2 37.9 58.2 23.7 69 13.4Z"
        fill="#FF5F00"
      />
    </svg>
    {!compact && (
      <span className="text-[10px] font-bold text-[#111111] tracking-tight leading-none hidden sm:inline">
        Mastercard
      </span>
    )}
  </div>
);

// ==========================================
// 5. AMEX (American Express) Brand Logo
// ==========================================
export const AmexLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
}) => (
  <div
    className={`inline-flex items-center justify-center px-2 py-1 rounded-md bg-[#002663] border border-[#002663] text-white shrink-0 shadow-2xs ${className}`}
    title="American Express"
  >
    <div className="flex items-center gap-1 font-heading font-black text-[10px] tracking-wider uppercase text-white leading-none">
      <span className="bg-white/20 px-1 py-0.5 rounded-[2px]">AMEX</span>
    </div>
  </div>
);

// ==========================================
// 6. SSLCommerz Secure Gateway Logo
// ==========================================
export const SslCommerzLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
  compact = false,
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0284C7]/10 border border-[#0284C7]/30 shrink-0 ${className}`}
    title="SSLCommerz Encrypted Gateway"
  >
    <svg className="h-3.5 w-3.5 shrink-0 text-[#0284C7]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.66 7 15 8.34 15 10V11H16C16.55 11 17 11.45 17 12V16C17 16.55 16.55 17 16 17H8C7.45 17 7 16.55 7 16V12C7 11.45 7.45 11 8 11H9V10C9 8.34 10.34 7 12 7ZM12 8.5C11.17 8.5 10.5 9.17 10.5 10V11H13.5V10C13.5 9.17 12.83 8.5 12 8.5Z" />
    </svg>
    {!compact && (
      <span className="text-[10px] font-black text-[#0284C7] tracking-tighter leading-none uppercase">
        SSLCommerz
      </span>
    )}
  </div>
);

// ==========================================
// 7. Cash on Delivery (COD) Badge
// ==========================================
export const CodLogo: React.FC<{ className?: string; compact?: boolean }> = ({
  className = 'h-6',
  compact = false,
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 shrink-0 ${className}`}
    title="Cash on Delivery (Available in Dhaka & select areas)"
  >
    <svg className="h-3.5 w-3.5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
    {!compact && (
      <span className="text-[10px] font-bold text-emerald-700 tracking-tight leading-none whitespace-nowrap">
        Cash on Delivery
      </span>
    )}
  </div>
);

// ==========================================
// Complete Row of All 7 Accepted Payment Logos
// ==========================================
interface PaymentLogosRowProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
  showTitle?: boolean;
}

export const PaymentLogosRow: React.FC<PaymentLogosRowProps> = ({
  variant = 'light',
  compact = false,
  className = '',
  showTitle = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showTitle && (
        <span
          className={`text-xs font-semibold mr-1 shrink-0 ${
            isDark ? 'text-neutral-400' : 'text-[#737373]'
          }`}
        >
          Accepted Payments:
        </span>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {/* 1. bKash */}
        <BkashLogo compact={compact} />

        {/* 2. Nagad */}
        <NagadLogo compact={compact} />

        {/* 3. Visa */}
        <VisaLogo compact={compact} />

        {/* 4. Mastercard */}
        <MastercardLogo compact={compact} />

        {/* 5. AMEX */}
        <AmexLogo compact={compact} />

        {/* 6. SSLCommerz */}
        <SslCommerzLogo compact={compact} />

        {/* 7. Cash on Delivery */}
        <CodLogo compact={compact} />
      </div>
    </div>
  );
};
