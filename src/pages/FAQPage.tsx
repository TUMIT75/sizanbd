import React, { useState } from 'react';
import { FAQS, FAQItem } from '../data/faqs';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ChevronDown, Search, Phone } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = [
    'All',
    'Authenticity & Warranty',
    'Orders & Delivery',
    'Showroom & Pickup',
    'Payment & EMI',
    'Returns & Exchange',
  ];

  const filteredFaqs = FAQS.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#737373]">
          Clear answers about warranty coverage, IMEI checking, showroom pickup, and delivery across Bangladesh.
        </p>

        {/* Search Input */}
        <div className="relative pt-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search questions (e.g. BTRC, delivery, EMI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#111111] outline-none focus:border-[#111111]"
          />
          <Search className="w-4 h-4 text-[#737373] absolute left-3 top-7 pointer-events-none" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-[#737373] border-[#E5E5E5] hover:border-[#111111]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E5E5E5] rounded-xl">
            <p className="text-xs text-[#737373]">
              No questions found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFAF8]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#737373] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#111111]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed border-t border-[#F0F0EE] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Contact Prompt */}
      <div className="p-5 bg-[#FAFAF8] border border-[#E5E5E5] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
        <div>
          <strong className="text-[#111111] block">Still have an unanswered question?</strong>
          <span className="text-[#737373]">Our showroom staff is ready to help you directly.</span>
        </div>
        <a
          href="tel:09612404040"
          className="px-4 py-2 bg-[#111111] text-white rounded-lg font-semibold hover:bg-[#262626] transition-colors flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 09612-404040</span>
        </a>
      </div>
    </div>
  );
};
