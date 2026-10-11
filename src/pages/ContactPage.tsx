import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useStore } from '../store/useStore';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      addToast('Missing Details', 'Please enter your name, mobile, and message.', 'warning');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setName('');
      setPhone('');
      setSubject('');
      setMessage('');
      addToast(
        'Message Sent',
        'Thank you! Our support team will call or message you shortly.',
        'success'
      );
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF]">
          We’re Here to Help
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-0.5">
          Get in Touch with SIZANBD
        </h1>
        <p className="text-xs sm:text-sm text-[#737373] mt-1 max-w-xl">
          Questions about warranty, device stock, or order status? Call our customer desk or drop us a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Direct Contact Channels
            </h3>

            <div className="space-y-3.5 text-xs text-[#4A4A4A]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#111111] block">Customer Hotline</strong>
                  <span className="text-xs font-semibold text-[#111111]">09612-404040</span>
                  <span className="block text-[#737373] text-[11px]">Sat - Thu: 10 AM - 9 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <strong className="text-[#111111] block">WhatsApp Support</strong>
                  <a
                    href="https://wa.me/8801711234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E5EFF] hover:underline"
                  >
                    +880 1711-234567
                  </a>
                  <span className="block text-[#737373] text-[11px]">Instant replies during showroom hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#111111] block">Email Support</strong>
                  <span>care@sizanbd.com</span>
                  <span className="block text-[#737373] text-[11px]">Replies within 2 to 4 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0F0EE]">
                <div className="w-8 h-8 rounded-lg bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#1E5EFF] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#111111] block">Head Office & Flagship Showroom</strong>
                  <span>Bashundhara City, Level 5, Block B, Shop 42, Panthapath, Dhaka 1205</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
            Send an Inquiry Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Shakib Al Hasan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Mobile Number"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Input
              label="Subject / Topic"
              placeholder="e.g. Device stock query / 0% EMI eligibility"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <div>
              <label className="block text-xs font-medium text-[#111111] mb-1.5">
                Your Message *
              </label>
              <textarea
                rows={4}
                placeholder="Describe how we can help you..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#E5E5E5] text-xs text-[#111111] p-3 outline-none focus:border-[#111111]"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSending}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
