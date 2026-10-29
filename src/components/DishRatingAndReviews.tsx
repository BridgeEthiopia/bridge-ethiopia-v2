import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, User, MapPin, X, ThumbsUp } from 'lucide-react';
import { DishReview } from '../types';
import { getSavedDishReviews, saveDishReview } from '../data/dishReviewsData';

interface DishRatingAndReviewsProps {
  dishId: string;
  dishName: string;
  className?: string;
  compact?: boolean;
}

export const DishRatingAndReviews: React.FC<DishRatingAndReviewsProps> = ({
  dishId,
  dishName,
  className = '',
  compact = false,
}) => {
  const [reviews, setReviews] = useState<DishReview[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load reviews on mount and when dishId changes
  const loadReviews = () => {
    const all = getSavedDishReviews();
    const dishReviews = all.filter((r) => r.dishId === dishId);
    setReviews(dishReviews);
  };

  useEffect(() => {
    loadReviews();
  }, [dishId]);

  // Calculate statistics
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      saveDishReview({
        dishId,
        dishName,
        authorName: authorName.trim(),
        authorLocation: authorLocation.trim() || 'Food Enthusiast',
        rating,
        comment: comment.trim(),
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      loadReviews();

      // Reset fields
      setTimeout(() => {
        setAuthorName('');
        setAuthorLocation('');
        setComment('');
        setShowReviewForm(false);
        setSubmitSuccess(false);
      }, 1500);
    }, 400);
  };

  const getStarRatingLabel = (val: number) => {
    switch (val) {
      case 5: return '★★★★★ Exceptional (Culinary Masterpiece)';
      case 4: return '★★★★☆ Delicious & Authentic';
      case 3: return '★★★☆☆ Good Flavor';
      case 2: return '★★☆☆☆ Fair';
      case 1: return '★☆☆☆☆ Needs Improvement';
      default: return 'Rate this dish';
    }
  };

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Compact Star Metric Bar */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8DACB]/60">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-[#D49A3D]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(Number(averageRating))
                      ? 'fill-[#D49A3D] text-[#D49A3D]'
                      : 'text-[#D5C9BC]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1E3A2F]">{averageRating}</span>
            <span className="text-[11px] text-[#8C7E6D]">({totalReviewsCount})</span>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-[11px] font-bold text-[#B85C38] hover:text-[#914224] transition-colors flex items-center gap-1 cursor-pointer"
            id={`btn-review-${dishId}`}
          >
            <MessageSquare className="w-3 h-3" />
            <span>{showReviewForm ? 'Cancel' : 'Rate & Review'}</span>
          </button>
        </div>

        {/* Inline Quick Review Input Form */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmit}
            className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DACB] space-y-3 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E3A2F]">Review "{dishName}"</span>
              <span className="text-[10px] text-[#8C7E6D]">Verified Guest</span>
            </div>

            {/* Interactive Stars Selector */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-[#D49A3D] hover:scale-110 transition-transform focus:outline-hidden"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= (hoverRating || rating)
                          ? 'fill-[#D49A3D] text-[#D49A3D]'
                          : 'text-[#D5C9BC]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-semibold text-[#B85C38]">
                {getStarRatingLabel(hoverRating || rating)}
              </p>
            </div>

            {/* Guest Name & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name (e.g. Maya L.)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#D5C9BC] bg-white text-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] outline-hidden"
              />
              <input
                type="text"
                placeholder="City / Country (e.g. London, UK)"
                value={authorLocation}
                onChange={(e) => setAuthorLocation(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#D5C9BC] bg-white text-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] outline-hidden"
              />
            </div>

            {/* Review Comment Textarea */}
            <textarea
              required
              rows={2}
              placeholder="What did you love about this dish or cooking class? (Flavor, spice level, preparation...)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#D5C9BC] bg-white text-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] outline-hidden resize-none"
            />

            {/* Submit Button & Status */}
            {submitSuccess ? (
              <div className="flex items-center gap-1.5 text-xs text-[#1E3A2F] font-bold p-2 bg-[#1E3A2F]/10 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                <span>Thank you! Your review is now live.</span>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <Send className="w-3 h-3 text-[#D49A3D]" />
                  <span>{isSubmitting ? 'Posting...' : 'Post Review'}</span>
                </button>
              </div>
            )}
          </form>
        )}

        {/* View Recent Reviews Modal Trigger */}
        {reviews.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAllReviewsModal(true)}
            className="text-[11px] text-[#6B6155] hover:text-[#1E3A2F] flex items-center gap-1 underline decoration-dotted cursor-pointer"
          >
            <ThumbsUp className="w-3 h-3 text-[#1E3A2F]" />
            <span>Read {totalReviewsCount} community reviews</span>
          </button>
        )}

        {/* Modal for all reviews */}
        {showAllReviewsModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl border border-[#E8E1D5] max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB]">
                <div>
                  <h4 className="text-lg font-bold text-[#1E3A2F] font-serif">{dishName}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#6B6155]">
                    <div className="flex items-center text-[#D49A3D]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-[#D49A3D]" />
                      ))}
                    </div>
                    <span className="font-bold text-[#1E3A2F]">{averageRating}</span>
                    <span>• {totalReviewsCount} traveler reviews</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllReviewsModal(false)}
                  className="p-1.5 rounded-full bg-[#FAF6EE] text-[#52483E] hover:bg-[#E8DACB]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-3 flex-1 pr-1">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DACB] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-xs font-bold">
                          {rev.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5">
                            <span>{rev.authorName}</span>
                            {rev.isVerified && (
                              <span className="px-1.5 py-0.5 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-[9px] font-semibold">
                                Verified
                              </span>
                            )}
                          </p>
                          {rev.authorLocation && (
                            <p className="text-[10px] text-[#8C7E6D] flex items-center gap-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{rev.authorLocation}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center text-[#D49A3D]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating ? 'fill-[#D49A3D]' : 'text-[#D5C9BC]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#52483E] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                    <p className="text-[10px] text-[#A39788] text-right">
                      {rev.createdAt}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E8DACB]">
                <button
                  type="button"
                  onClick={() => {
                    setShowAllReviewsModal(false);
                    setShowReviewForm(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-colors text-center"
                >
                  Write a Review for {dishName}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standard full view for dish cards
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Rating Summary */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8DACB]">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-[#D49A3D]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(Number(averageRating))
                    ? 'fill-[#D49A3D] text-[#D49A3D]'
                    : 'text-[#D5C9BC]'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-extrabold text-[#1E3A2F]">{averageRating} / 5</span>
          <span className="text-xs text-[#8C7E6D]">({totalReviewsCount} reviews)</span>
        </div>

        <button
          type="button"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-3 py-1.5 rounded-xl bg-[#B85C38]/10 hover:bg-[#B85C38]/20 text-[#B85C38] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          id={`btn-open-review-form-${dishId}`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{showReviewForm ? 'Close Form' : 'Write Quick Review'}</span>
        </button>
      </div>

      {/* Review Submission Form */}
      {showReviewForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-2xl bg-white border-2 border-[#D49A3D]/40 shadow-md space-y-3.5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DACB]">
            <div>
              <h4 className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
                Add Your Experience
              </h4>
              <p className="text-[11px] text-[#6B6155]">Share your honest feedback on {dishName}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-[10px] font-bold">
              Guest Feedback
            </span>
          </div>

          {/* Star Rating Interactive Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1E3A2F] block">
              Your Star Rating:
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-[#D49A3D] hover:scale-115 transition-transform focus:outline-hidden"
                  id={`star-btn-${dishId}-${star}`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? 'fill-[#D49A3D] text-[#D49A3D]'
                        : 'text-[#D5C9BC]'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-[#B85C38] ml-2">
                {getStarRatingLabel(hoverRating || rating)}
              </span>
            </div>
          </div>

          {/* Reviewer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-[#52483E] block mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-[#8C7E6D] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Thomas Laurent"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#D5C9BC] bg-[#FAF8F5] text-[#1E3A2F] focus:bg-white focus:ring-1 focus:ring-[#1E3A2F] outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#52483E] block mb-1">
                City / Country (Optional)
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#8C7E6D] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. San Francisco, USA"
                  value={authorLocation}
                  onChange={(e) => setAuthorLocation(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#D5C9BC] bg-[#FAF8F5] text-[#1E3A2F] focus:bg-white focus:ring-1 focus:ring-[#1E3A2F] outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-[11px] font-semibold text-[#52483E] block mb-1">
              Your Review & Thoughts *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the flavor, aroma, authenticity, or your cooking experience with Hindek..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#D5C9BC] bg-[#FAF8F5] text-[#1E3A2F] focus:bg-white focus:ring-1 focus:ring-[#1E3A2F] outline-hidden resize-none leading-relaxed"
            />
          </div>

          {/* Submit Actions */}
          {submitSuccess ? (
            <div className="p-3 rounded-xl bg-[#1E3A2F] text-white flex items-center justify-center gap-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#D49A3D]" />
              <span>Your review was published successfully!</span>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#6B6155] hover:bg-[#FAF6EE] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Quick Review'}</span>
              </button>
            </div>
          )}
        </form>
      )}

      {/* Recent Reviews Preview */}
      {reviews.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5 text-[#B85C38]" />
              <span>Guest Reviews & Social Proof ({totalReviewsCount})</span>
            </span>
          </div>

          <div className="space-y-2">
            {reviews.slice(0, 2).map((rev) => (
              <div
                key={rev.id}
                className="p-3 rounded-xl bg-white border border-[#E8DACB] space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1E3A2F]">{rev.authorName}</span>
                      {rev.authorLocation && (
                        <span className="text-[10px] text-[#8C7E6D] ml-1.5">({rev.authorLocation})</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center text-[#D49A3D]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= rev.rating ? 'fill-[#D49A3D]' : 'text-[#D5C9BC]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#52483E] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          {reviews.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAllReviewsModal(true)}
              className="text-xs font-bold text-[#B85C38] hover:text-[#914224] flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>View all {reviews.length} reviews for {dishName} →</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
