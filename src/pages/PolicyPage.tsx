import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { POLICIES } from '../data/policies';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = slug || 'warranty';
  const policy = POLICIES[currentSlug];

  const policyNav = [
    { slug: 'warranty', label: 'Warranty Policy' },
    { slug: 'return-refund', label: 'Return & Refund' },
    { slug: 'exchange', label: 'Exchange Facility' },
    { slug: 'delivery', label: 'Delivery & Shipping' },
    { slug: 'emi', label: '0% EMI Facility' },
    { slug: 'privacy', label: 'Privacy Policy' },
    { slug: 'terms', label: 'Terms of Service' },
  ];

  if (!policy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-[#111111]">Policy Page Not Found</h1>
        <p className="text-xs text-[#737373] mt-2 mb-6">
          The requested terms document could not be located.
        </p>
        <Link to="/policies/warranty" className="text-xs font-semibold text-[#1E5EFF] underline">
          View Warranty Policy
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Policies' },
          { label: policy.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Policy Links Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E5E5] rounded-xl p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#737373] tracking-wider px-3 block mb-2">
            SIZANBD Legal & Policies
          </span>
          {policyNav.map((item) => {
            const isActive = item.slug === currentSlug;
            return (
              <Link
                key={item.slug}
                to={`/policies/${item.slug}`}
                className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#111111] text-white font-bold'
                    : 'text-[#4A4A4A] hover:bg-[#FAFAF8]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#A3A3A3]'}`} />
              </Link>
            );
          })}
        </div>

        {/* Policy Document Content (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#F0F0EE] pb-4 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#1E5EFF] font-semibold">
              Official Policy Document
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              {policy.title}
            </h1>
            <p className="text-xs text-[#737373]">
              Last updated: {policy.lastUpdated} · Governed by SIZANBD Showrooms Bangladesh
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4A4A] italic bg-[#FAFAF8] p-3.5 rounded-lg border border-[#E5E5E5]">
            {policy.summary}
          </p>

          <div className="space-y-6 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
            {policy.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-sm sm:text-base font-bold text-[#111111]">
                  {sec.heading}
                </h2>
                <p>{sec.body}</p>

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#555555] pt-1">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#F0F0EE] flex items-center justify-between text-xs text-[#737373]">
            <span>Have a specific claim query?</span>
            <Link to="/contact" className="font-semibold text-[#1E5EFF] hover:underline">
              Contact Support Desk →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
