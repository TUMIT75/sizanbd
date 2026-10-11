import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="space-y-2">
        <span className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111111]">
          This page does not exist
        </h1>
        <p className="text-xs sm:text-sm text-[#737373] max-w-sm mx-auto leading-relaxed">
          The link you clicked may be broken, or the device was moved to another category.
        </p>
      </div>

      {/* Search box on 404 */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-sm mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search phones, laptops, audio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#111111] outline-none focus:border-[#111111]"
          />
          <Search className="w-4 h-4 text-[#737373] absolute left-3 top-3 pointer-events-none" />
        </div>
        <Button type="submit" variant="primary" size="sm">
          Search
        </Button>
      </form>

      {/* Quick Action buttons */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" size="md">
            Browse All Devices
          </Button>
        </Link>
      </div>
    </div>
  );
};
