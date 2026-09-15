import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle, ShieldCheck, MessageSquarePlus, ThumbsUp, Sparkles, Filter } from 'lucide-react';
import { getSavedTravelerReviews, syncServerReviews } from '../data/travelerReviewsData';
import { WriteReviewModal } from './WriteReviewModal';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'kitchen' | 'coffee' | 'tours'>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const loadReviewsData = () => {
    const local = getSavedTravelerReviews();
    setReviews(local);
  };

  useEffect(() => {
    loadReviewsData();

    // Sync from server asynchronously
    syncServerReviews().then((merged) => {
      setReviews(merged);
    });

    // Listen for new reviews created anywhere
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Review>;
      if (customEvent.detail) {
        setReviews((prev) => [customEvent.detail, ...prev.filter((r) => r.id !== customEvent.detail.id)]);
      } else {
        loadReviewsData();
      }
    };

    window.addEventListener('traveler-reviews-updated', handleUpdate);
    return () => window.removeEventListener('traveler-reviews-updated', handleUpdate);
  }, []);

  // Compute metrics
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0';
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fiveStarPct = totalReviewsCount > 0 ? Math.round((fiveStarCount / totalReviewsCount) * 100) : 100;

  // Filter reviews
  const filteredReviews = reviews.filter((rev) => {
    if (activeFilter === '5star') return rev.rating === 5;
    if (activeFilter === 'kitchen') {
      const text = `${rev.tourOrExperience} ${rev.comment}`.toLowerCase();
      return text.includes('kitchen') || text.includes('cook') || text.includes('injera') || text.includes('food');
    }
    if (activeFilter === 'coffee') {
      const text = `${rev.tourOrExperience} ${rev.comment}`.toLowerCase();
      return text.includes('coffee') || text.includes('grandpa') || text.includes('ceremony') || text.includes('abol');
    }
    if (activeFilter === 'tours') {
      const text = `${rev.tourOrExperience} ${rev.comment}`.toLowerCase();
      return text.includes('mountain') || text.includes('bale') || text.includes('lalibela') || text.includes('safari') || text.includes('tour') || text.includes('festival');
    }
    return true;
  });

  const handleHelpfulClick = (id: string) => {
    if (userVoted[id]) return;
    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setHelpfulVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleReviewSubmitted = (newRev: Review) => {
    setReviews((prev) => [newRev, ...prev.filter((r) => r.id !== newRev.id)]);
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header & Rating Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8DACB] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-[#D49A3D] fill-[#D49A3D]" />
              <span>Visitor & Traveler Voice</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
              What Travelers Say About <span className="text-[#B85C38] font-serif italic">Bridge Ethiopia</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
              Authentic stories, comments, and star ratings from visitors around the world.
              We invite every guest to share their genuine journey.
            </p>
          </div>

          {/* Call-to-action: Write a Review & Give Stars */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              id="btn-write-review"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#D49A3D]" />
              <span>Write a Review & Give Stars</span>
            </button>
          </div>
        </div>

        {/* Rating Score Snapshot Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EE] border border-[#E8DACB] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Average Rating Block */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E3A2F] text-[#D49A3D] flex flex-col items-center justify-center font-extrabold shadow-sm">
              <span className="text-2xl leading-none">{averageRating}</span>
              <span className="text-[10px] text-white/80 font-normal">out of 5</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#D49A3D]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(Number(averageRating))
                        ? 'fill-[#D49A3D] text-[#D49A3D]'
                        : 'text-[#D5C9BC]'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm font-extrabold text-[#1E3A2F]">
                {fiveStarPct}% 5-Star Ratings
              </div>
              <div className="text-xs text-[#8C7E6D]">
                Based on {totalReviewsCount} genuine traveler reviews
              </div>
            </div>
          </div>

          {/* Authenticity Guarantee */}
          <div className="space-y-1 md:border-l md:border-[#E8DACB] md:pl-6">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F]">
              <ShieldCheck className="w-4 h-4 text-[#34A853]" />
              <span>100% Real Community Reviews</span>
            </div>
            <p className="text-xs text-[#6B5E51] leading-relaxed">
              Every review comes from real visitors. Any traveler can submit their review, rating, and feedback without needing an account.
            </p>
          </div>

          {/* Quick Trigger Button in Banner */}
          <div className="flex justify-start md:justify-end">
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(true)}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#D49A3D] text-[#1E3A2F] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-[#D49A3D] text-[#D49A3D]" />
              <span>Leave Your Rating</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-[#8C7E6D] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#5C5247] hover:bg-[#E8DACB] border border-[#E8DACB]'
            }`}
          >
            All Reviews ({reviews.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('5star')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === '5star'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#5C5247] hover:bg-[#E8DACB] border border-[#E8DACB]'
            }`}
          >
            <Star className="w-3 h-3 fill-[#D49A3D] text-[#D49A3D]" />
            <span>5 Stars ({fiveStarCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('kitchen')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'kitchen'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#5C5247] hover:bg-[#E8DACB] border border-[#E8DACB]'
            }`}
          >
            Cooking & Food
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('coffee')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'coffee'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#5C5247] hover:bg-[#E8DACB] border border-[#E8DACB]'
            }`}
          >
            Coffee Ceremony
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('tours')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'tours'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#5C5247] hover:bg-[#E8DACB] border border-[#E8DACB]'
            }`}
          >
            Tours & Treks
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((rev) => {
            const votes = helpfulVotes[rev.id] || 0;
            const hasVoted = userVoted[rev.id];

            return (
              <div
                key={rev.id}
                className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] shadow-xs flex flex-col justify-between space-y-6 relative hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Rating & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D49A3D] text-[#D49A3D]" />
                      ))}
                      {[...Array(5 - rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#D5C9BC]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8C7E6D] font-medium">{rev.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#423B33] leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {/* Experience Tag */}
                  <div className="inline-block px-3 py-1 rounded-full bg-white border border-[#E8E1D5] text-[11px] font-semibold text-[#1E3A2F]">
                    Experience: {rev.tourOrExperience}
                  </div>
                </div>

                {/* Author Info & Helpful Button */}
                <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center font-serif text-sm font-bold border-2 border-[#D49A3D] shrink-0">
                      {rev.authorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'TR'}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#1E3A2F] flex items-center gap-1">
                        <span>{rev.authorName}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" title="Verified Traveler" />
                      </div>
                      <div className="text-[11px] text-[#8C7E6D]">{rev.authorCountry}</div>
                    </div>
                  </div>

                  {/* Thumbs Up Helpful Button */}
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      hasVoted
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-white text-[#8C7E6D] hover:text-[#1E3A2F] border border-[#E8E1D5]'
                    }`}
                    title="Was this review helpful?"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{votes > 0 ? `(${votes})` : 'Helpful'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state fallback */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-[#FAF8F5] rounded-3xl border border-[#E8E1D5] space-y-3">
            <p className="text-sm text-[#5C5247]">No reviews found in this category.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="text-xs font-bold text-[#B85C38] hover:underline cursor-pointer"
            >
              View all reviews
            </button>
          </div>
        )}

        {/* Bottom Call to Action for Visitors */}
        <div className="text-center pt-6">
          <p className="text-xs text-[#8C7E6D] mb-3">
            Traveled with Hindek or cooked in Hindek Kitchen? Your review inspires fellow travelers!
          </p>
          <button
            type="button"
            onClick={() => setIsWriteModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF6EE] hover:bg-[#E8DACB] border border-[#D49A3D]/40 text-[#1E3A2F] text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Star className="w-3.5 h-3.5 text-[#D49A3D] fill-[#D49A3D]" />
            <span>Share Your Review & Star Rating</span>
          </button>
        </div>

      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
};
