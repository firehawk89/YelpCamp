'use client';

import { routes } from '@/app/routes';
import { likeReview, unlikeReview } from '@/server/reviews';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { ThumbUp } from '@repo/ui/icons';
import Tooltip from '@repo/ui/tooltip';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface LikeReviewButtonProps extends Omit<ButtonProps, 'icon'> {
  userId?: User['_id'];
  review: Review;
  likedBy: string[];
}

const LikeReviewButton = ({ userId, review, likedBy, className, ...props }: LikeReviewButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isOwnReview = userId === review.author._id;
  const isLikedByUser = useMemo(() => likedBy.some((likedUserId) => likedUserId === userId), [likedBy, userId]);

  const handleLikeClick = async () => {
    if (!userId) {
      router.push(routes.signIn());
      return;
    }

    setIsLoading(true);

    try {
      if (!isLikedByUser) {
        await likeReview(review._id);
      } else {
        await unlikeReview(review._id);
      }
    } catch (error) {
      console.error('Error liking review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return isOwnReview ? (
    <Button
      className={cn({ 'text-accent': isLikedByUser }, className)}
      icon={likedBy.length ? <ThumbUp /> : null}
      disabled
      {...props}
    />
  ) : (
    <Tooltip label="Helpful">
      <Button
        className={cn({ 'text-accent': isLikedByUser }, className)}
        onClick={() => handleLikeClick()}
        disabled={isLoading}
        icon={<ThumbUp />}
        {...props}
      />
    </Tooltip>
  );
};

export default LikeReviewButton;
