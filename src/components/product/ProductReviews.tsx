import React, { useState } from 'react';
import { ProductReview } from '../../types';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useStore } from '../../store/useStore';

interface ProductReviewsProps {
  initialReviews: ProductReview[];
  productTitle: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  initialReviews,
  productTitle,
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [outlet, setOutlet] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addToast } = useStore();

  // Rating breakdown
  const total = reviews.length;
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sumRating = 0;

  reviews.forEach((r) => {
    ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
    sumRating += r.rating;
  });

  const avgRating = total > 0 ? (sumRating / total).toFixed(1) : '5.0';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      addToast('Missing Fields', 'Please provide your name and review text.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newRev: ProductReview = {
        id: `rev-${Date.now()}`,
        author: author.trim(),
        verifiedPurchase: true,
        rating,
        date: 'Just now',
        title: title.trim() || 'Verified Customer Review',
        comment: comment.trim(),
        outletVisited: outlet.trim() || undefined,
      };

      setReviews([newRev, ...reviews]);
      setAuthor('');
      setTitle('');
      setComment('');
      setOutlet('');
      setRating(5);
      setIsSubmitting(false);
      addToast('Review Submitted', 'Thank you! Your feedback helps other shoppers.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* 1. Rating Summary Breakdown */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left: Overall score */}
          <div className="text-center md:border-r md:border-[#E5E5E5] md:pr-6">
            <span className="text-4xl md:text-5xl font-black text-[#111111]">
              {avgRating}
            </span>
            <div className="flex items-center justify-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(Number(avgRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[#737373]">
              Based on {total} verified customer ratings
            </p>
          </div>

          {/* Right: Breakdown bars */}
          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const percent = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-12 text-[#737373] shrink-0">
                    <span>{stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-[#FAFAF8] border border-[#E5E5E5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[#737373]">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Existing Customer Reviews */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-[#111111]">
          Customer Experiences ({reviews.length})
        </h4>

        <div className="space-y-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-2.5 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#111111]">
                      {rev.author}
                    </span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  {rev.outletVisited && (
                    <p className="text-[11px] text-[#737373] mt-0.5">
                      Showroom Visit: {rev.outletVisited}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#A3A3A3] mt-0.5">
                    {rev.date}
                  </span>
                </div>
              </div>

              {rev.title && (
                <p className="text-xs font-semibold text-[#111111]">
                  {rev.title}
                </p>
              )}

              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Write a Review Form */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-4 h-4 text-[#1E5EFF]" />
          <h4 className="text-sm font-bold text-[#111111]">
            Share your experience with {productTitle}
          </h4>
        </div>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          {/* Star selector */}
          <div>
            <label className="block text-xs font-medium text-[#111111] mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  aria-label={`Rate ${s} stars`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      s <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-[#737373] ml-2 font-medium">
                {rating === 5 ? '5 Stars - Excellent' : `${rating} Stars`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Name"
              placeholder="e.g. Tanvir Ahmed"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <Input
              label="Showroom Visited (Optional)"
              placeholder="e.g. Bashundhara City"
              value={outlet}
              onChange={(e) => setOutlet(e.target.value)}
            />
          </div>

          <Input
            label="Review Title"
            placeholder="e.g. Original box, verified IMEI"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <label className="block text-xs font-medium text-[#111111] mb-1.5">
              Your Review
            </label>
            <textarea
              rows={3}
              placeholder="Tell others about device performance, packaging, or customer service at SIZANBD..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-lg bg-white border border-[#E5E5E5] text-sm text-[#111111] placeholder:text-[#A3A3A3] p-3 focus:outline-none focus:ring-2 focus:ring-[#111111]"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
          >
            Post Review
          </Button>
        </form>
      </div>
    </div>
  );
};
