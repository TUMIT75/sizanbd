export interface PolicyDoc {
  slug: string;
  title: string;
  lastUpdated: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
  }[];
}

export const POLICIES: Record<string, PolicyDoc> = {
  warranty: {
    slug: 'warranty',
    title: 'Warranty Policy',
    lastUpdated: 'October 2026',
    summary: 'Clear, transparent hardware and service coverage terms for all devices sold at SIZANBD showrooms and online store.',
    sections: [
      {
        heading: '1. Official vs Global Warranty Coverage',
        body: 'Every item on SIZANBD is transparently badged as either "Official" or "Unofficial" (Global):',
        bullets: [
          'Official Products: Backed by the brand authorized service center in Bangladesh (Apple, Samsung Bangladesh, Xiaomi BD, etc.) with full manufacturer warranty as stated on the warranty card.',
          'Global / Unofficial Products: 100% original hardware covered by SIZANBD\'s 10-day replacement policy and 1-year free service warranty.',
        ],
      },
      {
        heading: '2. 10-Day Replacement Terms',
        body: 'If your brand-new device exhibits a verified manufacturing hardware defect within 10 days of purchase, we replace it with a fresh unit. The device must be in original condition with box, charger, warranty card, and cash memo intact.',
      },
      {
        heading: '3. What Is Not Covered',
        body: 'Physical damage, liquid damage (water ingress), burns from electrical power surges, unauthorized repair attempts, or root/jailbreak modifications will void warranty coverage.',
      },
      {
        heading: '4. Claiming Warranty',
        body: 'Simply visit any of our 4 showrooms in Dhaka with your purchase memo, or call our customer hotline at 09612-404040. For customers outside Dhaka, you can courier the unit back to our service desk at Bashundhara City.',
      },
    ],
  },
  'return-refund': {
    slug: 'return-refund',
    title: 'Return & Refund Policy',
    lastUpdated: 'October 2026',
    summary: 'Our fair return and instant refund policy designed to protect buyers across Bangladesh.',
    sections: [
      {
        heading: '1. Eligibility for Returns',
        body: 'You may request a return within 7 calendar days of receipt if:',
        bullets: [
          'The product delivered was physically damaged during transit.',
          'The delivered model, storage size, or color differs from your confirmed order.',
          'The device has a hardware defect covered under our 10-day replacement policy.',
        ],
      },
      {
        heading: '2. Non-Returnable Scenarios',
        body: 'Change-of-mind returns after the product box plastic wrap or seal has been broken are not accepted. Accessories such as opened in-ear tips are non-returnable due to hygiene reasons.',
      },
      {
        heading: '3. Refund Processing',
        body: 'Once the returned item is inspected at our service center, refunds are processed within 24 to 72 hours via the original payment channel (bKash, Nagad, or Bank Card reversal). Cash on Delivery orders are refunded via direct bKash or Bank transfer.',
      },
    ],
  },
  exchange: {
    slug: 'exchange',
    title: 'Device Exchange Facility',
    lastUpdated: 'October 2026',
    summary: 'Upgrade your current smartphone, laptop, or tablet effortlessly at any SIZANBD showroom.',
    sections: [
      {
        heading: '1. How SIZANBD Exchange Works',
        body: 'Trade in your old device for an instant discount against any new gadget in stock. The evaluation process takes just 15 minutes in our showroom.',
        bullets: [
          'Bring your old phone with box and original charger if available (increases valuation).',
          'Our technician runs a fast 15-point hardware test (display, camera, battery health, speakers).',
          'We quote an honest market exchange value.',
          'Deduct the agreed amount immediately from your new purchase invoice.',
        ],
      },
      {
        heading: '2. Valuation Criteria',
        body: 'We value devices based on cosmetic condition (Grade A, B, C), battery health, display originality, and market demand. Devices must be unlocked and logged out of iCloud / Google accounts.',
      },
    ],
  },
  delivery: {
    slug: 'delivery',
    title: 'Delivery & Shipping Information',
    lastUpdated: 'October 2026',
    summary: 'Fast, secure doorstep delivery inside Dhaka and nationwide across 64 districts.',
    sections: [
      {
        heading: '1. Dhaka City Same-Day Delivery',
        body: 'Delivery inside Dhaka city costs ৳80. Orders placed before 3:00 PM are delivered the same afternoon or evening. You can inspect the outer packaging before payment.',
      },
      {
        heading: '2. Nationwide Courier Delivery',
        body: 'For all locations outside Dhaka, we charge ৳150 flat shipping via Steadfast, Paperfly, or SA Paribahan. Delivery takes 2 to 4 working days with complete tracking SMS.',
      },
      {
        heading: '3. Free Showroom Pickup',
        body: 'Save on delivery costs and collect your order at your convenience from any of our 4 showrooms in Bashundhara City, Jamuna Future Park, Dhanmondi, or Uttara.',
      },
    ],
  },
  emi: {
    slug: 'emi',
    title: '0% EMI Facility',
    lastUpdated: 'October 2026',
    summary: 'Shop top-tier flagships with flexible 3, 6, 9, or 12-month installment plans.',
    sections: [
      {
        heading: '1. Partner Banks',
        body: 'We have partnerships with 24 major credit card issuing banks in Bangladesh:',
        bullets: [
          'City Bank (American Express & Visa)',
          'BRAC Bank',
          'Eastern Bank Limited (EBL)',
          'Standard Chartered Bank',
          'Dhaka Bank, Prime Bank, UCB, Dutch-Bangla Bank (DBBL)',
        ],
      },
      {
        heading: '2. EMI Eligibility & Minimum Amount',
        body: 'The minimum cart total required for EMI processing is ৳15,000. EMI tenure options include 3, 6, 9, and 12 months. Processing is conducted via the bank card terminal at our showroom or online through SSLCommerz.',
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: 'October 2026',
    summary: 'How SIZANBD protects your personal details and payment data.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'We collect your name, phone number, delivery address, and optional email solely to fulfill orders, send SMS tracking updates, and provide warranty assistance. We never sell your personal information.',
      },
      {
        heading: '2. Payment Security',
        body: 'All online financial transactions are handled via SSLCommerz with 128-bit bank-grade encryption. SIZANBD never sees or stores your card CVV, pin, or mobile banking passwords.',
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    lastUpdated: 'October 2026',
    summary: 'The terms governing purchases, warranties, and orders with SIZANBD.',
    sections: [
      {
        heading: '1. Order Acceptance & Price Integrity',
        body: 'Due to international exchange fluctuations, gadget prices in Bangladesh can shift. Once you place a confirmed order on our website, your price is locked and guaranteed.',
      },
      {
        heading: '2. BTRC Compliance',
        body: 'Official handsets comply with all regulations set by the Bangladesh Telecommunication Regulatory Commission (BTRC). IMEI numbers are printed clearly on every customer cash memo.',
      },
    ],
  },
};
