import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { GoogleLoginButton } from '../components/common/GoogleLoginButton';
import { ShieldCheck, Phone, Smartphone, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';

  const { user, login } = useStore();
  const [phoneLogin, setPhoneLogin] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // If already logged in, redirect
  if (user) {
    navigate(callbackUrl, { replace: true });
    return null;
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneLogin.trim()) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingOtp(true);
    setTimeout(() => {
      login({
        name: 'Verified Customer',
        email: `${phoneLogin}@sizanbd.com`,
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      });
      setIsVerifyingOtp(false);
      navigate(callbackUrl, { replace: true });
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14 space-y-6">
      <Breadcrumb items={[{ label: 'Sign In' }]} />

      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-[11px] font-heading uppercase tracking-wider text-[#1E5EFF] font-bold">
            Customer Portal
          </span>
          <h1 className="text-2xl font-heading font-bold text-[#111111]">
            Sign in to SIZANBD
          </h1>
          <p className="text-xs font-body text-[#6B6B6B] leading-relaxed">
            Manage your orders, save delivery addresses, and track warranties.
          </p>
        </div>

        {/* 1. Continue with Google Button */}
        <div className="space-y-3">
          <GoogleLoginButton
            text="Continue with Google"
            onSuccess={() => navigate(callbackUrl, { replace: true })}
          />
          <p className="text-[11px] text-[#737373] text-center">
            Fast, 1-click secure authentication with your Google account
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E5E5E5] w-full" />
          <span className="bg-white px-3 text-[11px] text-[#A3A3A3] uppercase font-medium">
            or sign in with mobile
          </span>
        </div>

        {/* 2. Bangladeshi Phone OTP login */}
        {!otpSent ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-3">
            <Input
              label="Bangladeshi Mobile Number"
              placeholder="01XXXXXXXXX"
              value={phoneLogin}
              onChange={(e) => setPhoneLogin(e.target.value)}
              required
            />
            <Button type="submit" variant="outline" size="md" fullWidth>
              Send SMS Verification Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>OTP code sent to {phoneLogin} (Demo: enter any 4 digits)</span>
            </div>
            <Input
              label="Enter 4-Digit OTP"
              placeholder="1234"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" size="md" fullWidth disabled={isVerifyingOtp}>
              {isVerifyingOtp ? 'Verifying...' : 'Verify & Sign In'}
            </Button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="text-[11px] text-[#1E5EFF] hover:underline block mx-auto pt-1 cursor-pointer"
            >
              Change mobile number
            </button>
          </form>
        )}

        {/* Guest fallback */}
        <div className="pt-2 border-t border-[#F0F0EE]">
          <Link to="/shop">
            <Button variant="ghost" size="sm" fullWidth className="text-[#737373]">
              Continue Browsing as Guest →
            </Button>
          </Link>
        </div>

        <div className="pt-1 text-center">
          <p className="text-[11px] text-[#737373] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Encrypted authentication · 100% data privacy</span>
          </p>
        </div>
      </div>
    </div>
  );
};
