interface StarRatingProps {
  rating: number;
  onChange?: (r: number) => void;
  readonly?: boolean;
}

export function StarRating({ rating, onChange, readonly }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`text-lg ${star <= rating ? 'text-accent-400' : 'text-gray-200'} ${readonly ? 'cursor-default' : 'cursor-pointer hover:text-accent-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
