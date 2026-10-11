export interface FAQItem {
  id: string;
  category: 'Orders & Delivery' | 'Authenticity & Warranty' | 'Showroom & Pickup' | 'Payment & EMI' | 'Returns & Exchange';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Authenticity & Warranty',
    question: 'Are all products at SIZANBD 100% original and verified?',
    answer: 'Yes, absolutely. We source exclusively from official distributors and verified international supply lines. Every boxed device is brand new, factory sealed, and has an untampered IMEI or serial number. For official units, you can check registration directly on the BTRC IMEI portal. You are always welcome to open and verify the seal at our showroom before paying.',
  },
  {
    id: 'faq-2',
    category: 'Authenticity & Warranty',
    question: 'What is the difference between "Official" and "Unofficial" units on your website?',
    answer: '"Official" devices are imported through brand-authorized national channels in Bangladesh, with government taxes and BTRC registration included, and serviced directly by the brand authorized service center. "Unofficial" (or Global) units are authentic international variants brought through global retail channels; they are genuine original hardware, but backed by SIZANBD\'s 10-day replacement and 1-year service warranty instead of the local brand center.',
  },
  {
    id: 'faq-3',
    category: 'Orders & Delivery',
    question: 'How fast is delivery inside Dhaka?',
    answer: 'Orders placed before 3:00 PM are delivered same-day across all central Dhaka locations (Dhanmondi, Gulshan, Banani, Uttara, Mirpur, Mohammadpur, Old Dhaka). Orders after 3:00 PM are delivered the next morning. Delivery charge is a flat ৳80 inside Dhaka.',
  },
  {
    id: 'faq-4',
    category: 'Orders & Delivery',
    question: 'Do you deliver outside Dhaka?',
    answer: 'Yes, we ship nationwide across all 64 districts using Steadfast, Paperfly, and SA Paribahan. Delivery takes 2 to 4 days, with full transit insurance. Delivery charge is ৳150.',
  },
  {
    id: 'faq-5',
    category: 'Showroom & Pickup',
    question: 'Can I order online and pick up my item from a showroom?',
    answer: 'Yes! Select "Store Pickup (Free)" during checkout, and choose your preferred branch: Bashundhara City, Jamuna Future Park, Dhanmondi, or Uttara. We will prepare your device and keep it ready so you don\'t have to wait in line.',
  },
  {
    id: 'faq-6',
    category: 'Payment & EMI',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (inside Dhaka and select district headquarters), bKash, Nagad, Visa, Mastercard, American Express, and bank transfer. For online checkout, we use SSLCommerz encrypted gateway.',
  },
  {
    id: 'faq-7',
    category: 'Payment & EMI',
    question: 'How does 0% EMI work at SIZANBD?',
    answer: 'We offer 0% EMI up to 12 months for purchases above ৳15,000 using credit cards from 24 partner banks (including City Bank Amex, BRAC Bank, Eastern Bank, Standard Chartered, SCB, DBBL, Prime Bank). EMI can be availed both online and in our physical showrooms.',
  },
  {
    id: 'faq-8',
    category: 'Returns & Exchange',
    question: 'What is your device exchange policy?',
    answer: 'Have an older phone, tablet, or laptop? Bring it to any of our showrooms or share device specs online. We evaluate battery health, physical condition, and market value in 15 minutes, and deduct that exact amount from your new device purchase.',
  },
  {
    id: 'faq-9',
    category: 'Returns & Exchange',
    question: 'What happens if my phone has a manufacturer defect?',
    answer: 'We provide an unconditional 7 to 10-day replacement warranty for manufacturing defects. Bring the phone with box and purchase invoice, and our technician will inspect and issue a replacement on the spot.',
  },
];
