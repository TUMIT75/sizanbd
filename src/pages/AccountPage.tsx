import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatBDT } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { GoogleLoginButton } from '../components/common/GoogleLoginButton';
import {
  User,
  Package,
  MapPin,
  LogOut,
  Truck,
  CheckCircle2,
  Lock,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, login, logout, orders, addToast } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('01712345678');
  const [loginPass, setLoginPass] = useState('');

  // Customer profile info
  const customer = {
    name: user?.name || 'Tawhid Hasan',
    phone: '01712345678',
    email: user?.email || 'tawhid.hasan@gmail.com',
    memberSince: 'March 2024',
    verified: true,
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: 'Tawhid Hasan',
      email: 'tawhid.hasan@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    });
    addToast('Welcome Back', 'Logged in as Tawhid Hasan', 'success');
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 space-y-6">
        <Breadcrumb items={[{ label: 'My Account' }]} />

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-[#111111]">
              Sign in to SIZANBD Account
            </h1>
            <p className="text-xs text-[#737373]">
              Access order history, track warranties, and manage delivery addresses.
            </p>
          </div>

          {/* Prominent Login with Google Button */}
          <div className="space-y-2">
            <GoogleLoginButton text="Continue with Google" />
            <p className="text-[11px] text-[#737373] text-center">
              One-click instant login with Google authentication
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E5E5E5] w-full" />
            <span className="bg-white px-3 text-[11px] text-[#A3A3A3] uppercase font-medium">
              or use mobile number
            </span>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {authMode === 'register' && (
              <Input
                label="Full Name"
                placeholder="e.g. Tawhid Hasan"
                required
              />
            )}

            <Input
              label="Bangladeshi Mobile Number"
              placeholder="01XXXXXXXXX"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" size="md" fullWidth>
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-[#F0F0EE]">
            {authMode === 'login' ? (
              <p className="text-xs text-[#737373]">
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="font-semibold text-[#1E5EFF] hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-[#737373]">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-semibold text-[#1E5EFF] hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumb items={[{ label: 'Customer Account' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#111111]">{customer.name}</h1>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Customer
            </span>
          </div>
          <p className="text-xs text-[#737373] mt-0.5">
            {customer.phone} · {customer.email} · Member since {customer.memberSince}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs text-[#737373] hover:text-red-600 flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#E5E5E5] rounded-xl p-3 space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#111111] text-white'
                : 'text-[#4A4A4A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#111111] text-white'
                : 'text-[#4A4A4A] hover:bg-[#FAFAF8]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#111111] text-white'
                : 'text-[#4A4A4A] hover:bg-[#FAFAF8]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Details</span>
          </button>
        </div>

        {/* Tab Content (9 cols) */}
        <div className="lg:col-span-9">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                Recent Orders
              </h2>

              {orders.length === 0 ? (
                <div className="p-8 text-center bg-white border border-[#E5E5E5] rounded-xl">
                  <p className="text-xs text-[#737373]">No orders placed yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F0F0EE] gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#737373] block">
                            Order ID
                          </span>
                          <span className="text-sm font-mono font-bold text-[#111111]">
                            {ord.orderId}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#1E5EFF] px-2 py-0.5 bg-blue-50 border border-blue-200 rounded">
                            {ord.status}
                          </span>
                          <Link to={`/track-order?id=${ord.orderId}`}>
                            <Button variant="outline" size="sm" rightIcon={<Truck className="w-3.5 h-3.5" />}>
                              Track
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((it) => (
                          <div key={it.id} className="flex justify-between text-xs">
                            <span className="text-[#4A4A4A]">
                              {it.title} ({it.variantName}) × {it.quantity}
                            </span>
                            <span className="font-semibold text-[#111111]">
                              {formatBDT(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#F0F0EE] flex justify-between items-center text-xs">
                        <span className="text-[#737373]">
                          Delivery: {ord.deliveryMethod === 'store_pickup' ? ord.outletPickup : `${ord.thana}, ${ord.district}`}
                        </span>
                        <span className="font-extrabold text-[#111111]">
                          Total: {formatBDT(ord.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                Primary Shipping Address
              </h2>
              <div className="p-4 bg-[#FAFAF8] border border-[#E5E5E5] rounded-lg text-xs space-y-1">
                <strong className="text-sm text-[#111111] block">Tawhid Hasan (Home)</strong>
                <p className="text-[#737373]">House 14, Road 5, Dhanmondi R/A</p>
                <p className="text-[#737373]">Dhaka 1205, Bangladesh</p>
                <p className="text-[#737373]">Contact: 01712345678</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#737373] block">Full Name</span>
                  <strong className="text-[#111111]">{customer.name}</strong>
                </div>
                <div>
                  <span className="text-[#737373] block">Mobile Number</span>
                  <strong className="text-[#111111]">{customer.phone}</strong>
                </div>
                <div>
                  <span className="text-[#737373] block">Email</span>
                  <strong className="text-[#111111]">{customer.email}</strong>
                </div>
                <div>
                  <span className="text-[#737373] block">Preferred Showroom</span>
                  <strong className="text-[#111111]">Bashundhara City Flagship</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
