'use client';

import { routes } from '@/app/routes';
import { likeReview, unlikeReview } from '@/server/reviews';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { ThumbUp } from '@repo/ui/icons';
import Tooltip from '@repo/ui/tooltip';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface LikeReviewButtonProps extends Omit<ButtonProps, 'icon'> {
  userId?: User['_id'];
  reviewId: string;
  likedBy: string[];
}

const LikeReviewButton = ({ userId, reviewId, likedBy, className, ...props }: LikeReviewButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isLikedByUser = useMemo(() => likedBy.some((likedUserId) => likedUserId === userId), [likedBy, userId]);

  const handleLikeClick = async () => {
    if (!userId) {
      router.push(routes.signIn());
      return;
    }

    setIsLoading(true);

    try {
      if (!isLikedByUser) {
        await likeReview(reviewId);
      } else {
        await unlikeReview(reviewId);
      }
    } catch (error) {
      console.error('Error liking review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
