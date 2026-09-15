import React, { useState } from 'react';
import { Star, X, CheckCircle2, MessageSquare, Send, Heart, MapPin, User, Sparkles } from 'lucide-react';
import { saveTravelerReview } from '../data/travelerReviewsData';
import { Review } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (newReview: Review) => void;
  defaultExperience?: string;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
  defaultExperience = 'Hindek Kitchen & Cultural Tour'
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorCountry, setAuthorCountry] = useState('');
  const [tourOrExperience, setTourOrExperience] = useState(defaultExperience);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const quickExperiences = [
    'Hindek Kitchen & Cooking Class',
    'Hindek Grandpa Coffee Ceremony',
    'Addis Ababa Heritage & Entoto',
    'Bale Mountains & Wildlife Safari',
    'Lalibela Rock Churches Expedition',
    'Danakil Depression & Erta Ale',
    'Meskel, Timkat & Irreecha Festivals',
    'Custom Private Guided Journey'
  ];

  const getStarRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return '★★★★★ 5.0 • Extraordinary (Unforgettable Experience!)';
      case 4:
        return '★★★★☆ 4.0 • Very Good (Great Host & Tour)';
      case 3:
        return '★★★☆☆ 3.0 • Good (Enjoyed the Journey)';
      case 2:
        return '★★☆☆☆ 2.0 • Fair (Room for Improvement)';
      case 1:
        return '★☆☆☆☆ 1.0 • Poor Experience';
      default:
        return 'Select your rating';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMsg('Please write a few words about your experience.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const created = await saveTravelerReview({
        authorName: authorName.trim(),
        authorCountry: authorCountry.trim() || 'Global Traveler',
        rating,
        tourOrExperience: tourOrExperience.trim() || 'Bridge Ethiopia Experience',
        comment: comment.trim()
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onReviewSubmitted) {
        onReviewSubmitted(created);
      }

      // Automatically close after a short delay
      setTimeout(() => {
        setIsSubmitted(false);
        setAuthorName('');
        setAuthorCountry('');
        setComment('');
        onClose();
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Failed to save review. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8E1D5] z-10 my-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8C7E6D] hover:text-[#1E3A2F] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
          title="Close review modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-[#34A853]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E3A2F]">Thank You for Your Review!</h3>
            <p className="text-sm text-[#5C5247] max-w-md mx-auto">
              Your {rating}-star rating and comment have been published. Travelers around the world appreciate your authentic feedback!
            </p>
            <div className="flex justify-center items-center gap-1 text-[#D49A3D]">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D49A3D]" />
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D49A3D]/15 text-[#91621E] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>Visitor & Traveler Voice</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E3A2F] tracking-tight">
                Rate & Review Your Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5247]">
                Every visitor is invited to share honest feedback and star ratings. No account or password required!
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                {errorMsg}
              </div>
            )}

            {/* 1-5 Star Interactive Selector */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <label className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider block">
                Your Star Rating *
              </label>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1.5 rounded-lg hover:bg-white/80 transition-transform active:scale-95 cursor-pointer"
                    title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-[#D49A3D] text-[#D49A3D]'
                          : 'text-[#D5C9BC]'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-base font-extrabold text-[#1E3A2F] ml-2">
                  {hoverRating || rating}.0
                </span>
              </div>

              <div className="text-xs font-bold text-[#B85C38]">
                {getStarRatingLabel(hoverRating || rating)}
              </div>
            </div>

            {/* Traveler Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Your Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Jessica & Liam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DACB] text-sm text-[#1E3A2F] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A2F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Country / Hometown</span>
                </label>
                <input
                  type="text"
                  value={authorCountry}
                  onChange={(e) => setAuthorCountry(e.target.value)}
                  placeholder="e.g. Germany, UK, USA, Kenya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DACB] text-sm text-[#1E3A2F] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A2F]"
                />
              </div>
            </div>

            {/* Experience Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1E3A2F]">
                Which Experience or Tour Did You Try?
              </label>

              {/* Quick Select Pills */}
              <div className="flex flex-wrap gap-1.5">
                {quickExperiences.map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setTourOrExperience(exp)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      tourOrExperience === exp
                        ? 'bg-[#1E3A2F] text-white shadow-xs'
                        : 'bg-[#FAF6EE] text-[#5C5247] hover:bg-[#E8E1D5]'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={tourOrExperience}
                onChange={(e) => setTourOrExperience(e.target.value)}
                placeholder="Or type a custom experience..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8DACB] text-xs text-[#1E3A2F] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A2F]"
              />
            </div>

            {/* Comment / Review Body */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#B85C38]" />
                <span>Your Honest Review & Comments *</span>
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you love most about your time with Hindek? How was the food, coffee ceremony, safety, local insight, or hospitality?"
                className="w-full p-3.5 rounded-xl border border-[#E8DACB] text-sm text-[#1E3A2F] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A2F] leading-relaxed resize-none"
              />
              <span className="text-[11px] text-[#8C7E6D] block text-right">
                {comment.length} / 1500 characters
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E1D5]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#5C5247] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#284E3F] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Post Review & Stars</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
