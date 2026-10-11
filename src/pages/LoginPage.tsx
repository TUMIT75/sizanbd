import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';

  const { user, login } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    navigate(callbackUrl, { replace: true });
    return null;
  }

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: 'Tawhid Hasan',
        email: 'tawhid.hasan@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      });
      setIsLoading(false);
      navigate(callbackUrl, { replace: true });
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <Breadcrumb items={[{ label: 'Sign In' }]} />

      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-[11px] font-heading uppercase tracking-wider text-[#1E5EFF] font-bold">
            Customer Portal
          </span>
          <h1 className="text-2xl font-heading font-bold text-[#111111]">
            Welcome to SIZANBD
          </h1>
          <p className="text-xs font-body text-[#6B6B6B] leading-relaxed">
            Sign in to track orders and save your delivery addresses.
          </p>
        </div>

        {/* Continue with Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-[#FAFAF8] border border-[#E5E5E5] hover:border-[#CCCCCC] rounded-xl text-xs font-heading font-bold text-[#111111] transition-all duration-200 active:scale-[0.98] shadow-2xs cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{isLoading ? 'Connecting Google Account...' : 'Continue with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E5E5E5] w-full" />
          <span className="bg-white px-3 text-[11px] text-[#A3A3A3] uppercase font-medium">
            or checkout as guest
          </span>
        </div>

        <div className="space-y-3">
          <Link to="/shop">
            <Button variant="outline" size="md" fullWidth>
              Continue Browsing as Guest
            </Button>
          </Link>
        </div>

        <div className="pt-2 border-t border-[#F0F0EE] text-center">
          <p className="text-[11px] text-[#737373] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Secure authentication. We never post to your Google profile.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
