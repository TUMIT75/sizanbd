import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  // SIZANBD customer service WhatsApp: +8801711234567
  const whatsappUrl = 'https://wa.me/8801711234567?text=Hello%20SIZANBD,%20I%20am%20interested%20in%20a%20product.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SIZANBD on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
    </a>
  );
};
