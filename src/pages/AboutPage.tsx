import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { ShieldCheck, MapPin, Users, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'About SIZANBD' }]} />

      {/* Hero statement */}
      <div className="space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF]">
          Our Journey
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Original Devices. Real Warranty. Honest Advice.
        </h1>
        <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
          Founded in 2016 from a small shop on Level 5 of Bashundhara City in Dhaka,
          SIZANBD was created to solve a widespread frustration among Bangladeshi tech enthusiasts:
          unclear warranties, repackaged phones, and hidden defects.
        </p>
      </div>

      {/* Story Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-video border border-[#E5E5E5] bg-[#FAFAF8]">
        <img
          src="https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80"
          alt="SIZANBD Experience Center"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Narrative Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] mb-2">
            Why We Built SIZANBD Differently
          </h2>
          <p>
            When buying a flagship phone in Bangladesh, customers often faced vague answers about whether a phone was active, refurbished, or unofficial.
            From day one, our policy was transparent: you stand in our showroom, open the factory seal yourself, check the activation status on the Apple or Samsung server before paying a single taka.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] mb-2">
            Online Convenience + Physical Peace of Mind
          </h2>
          <p>
            Today, SIZANBD operates 4 physical showrooms across Dhaka (Bashundhara City, Jamuna Future Park, Dhanmondi, and Uttara) alongside our nationwide delivery platform.
            If you order online, you have real brick-and-mortar stores you can walk into whenever you need a screen guard, data migration, or warranty support.
          </p>
        </div>

        {/* 3 Core Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F0F0EE]">
          <div className="p-4 bg-[#FAFAF8] rounded-lg border border-[#E5E5E5]">
            <ShieldCheck className="w-5 h-5 text-[#1E5EFF] mb-2" />
            <h3 className="text-xs font-bold text-[#111111]">Zero Refurbished Fluff</h3>
            <p className="text-[11px] text-[#737373] mt-1">
              Every unit is factory original. If we ever sell a pre-owned phone, it is openly graded with diagnostic reports.
            </p>
          </div>

          <div className="p-4 bg-[#FAFAF8] rounded-lg border border-[#E5E5E5]">
            <Users className="w-5 h-5 text-emerald-600 mb-2" />
            <h3 className="text-xs font-bold text-[#111111]">Human First Advice</h3>
            <p className="text-[11px] text-[#737373] mt-1">
              We never push higher-priced gadgets if a modest one fits your budget and daily workload better.
            </p>
          </div>

          <div className="p-4 bg-[#FAFAF8] rounded-lg border border-[#E5E5E5]">
            <HeartHandshake className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-xs font-bold text-[#111111]">Real After-Sales</h3>
            <p className="text-[11px] text-[#737373] mt-1">
              10-day replacement on manufacturing flaws, 1-year service support, and free lifetime OS setup.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-6 bg-[#FAFAF8] border border-[#E5E5E5] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#111111]">
            Come Say Hello in Our Showroom
          </h3>
          <p className="text-xs text-[#737373] mt-0.5">
            Test devices, enjoy a cup of cha, and chat with our team.
          </p>
        </div>

        <Link to="/stores">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Showroom Branches
          </Button>
        </Link>
      </div>
    </div>
  );
};
