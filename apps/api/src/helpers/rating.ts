export const getUpdatedRating = (
  reviewRating: number,
  campgroundRating: number,
  reviewsCount: number,
  newReviewsCount: number
) => {
  if (newReviewsCount === 0) {
    return 0;
  }
  const newRating = Math.round(((campgroundRating * reviewsCount + reviewRating) / newReviewsCount) * 100) / 100;
  return newRating;
};
