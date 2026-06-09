import { useEffect, useState } from 'react';
import api from '../../api/client';
import { StarRating } from '../ui/star-rating';
import { Badge } from '../ui/badge';

interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  user: { name: string };
  createdAt: string;
}

interface ReviewsProps {
  productId: number;
}

export function Reviews({ productId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${productId}/reviews`).then(({ data }) => {
      setReviews(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [productId]);

  const submitReview = async () => {
    if (!comment.trim()) return;
    const { data } = await api.post(`/products/${productId}/reviews`, { rating, comment });
    setReviews((prev) => [...prev, data]);
    setComment('');
    setRating(5);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="rounded-xl border border-primary-100 bg-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
        {avgRating && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(+avgRating)} readonly />
            <span className="text-sm text-gray-500">({avgRating})</span>
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-400 mb-4">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4 mb-6">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-lg bg-primary-50/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">{r.user.name}</span>
                  <Badge variant="accent" size="sm">{r.rating}/5</Badge>
                </div>
                <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-1 mb-1">
                <StarRating rating={r.rating} readonly />
              </div>
              <p className="text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-primary-100 pt-4">
        <h4 className="font-semibold text-gray-700 mb-3">Write a Review</h4>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">Your rating:</span>
          <StarRating rating={rating} onChange={setRating} />
        </div>
        <textarea
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-lg border border-primary-200 p-3 text-sm text-gray-700 placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none resize-none"
          rows={3}
        />
        <button
          onClick={submitReview}
          disabled={!comment.trim()}
          className="mt-3 rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
