'use client';

import { addFavoriteCampground, removeFavoriteCampground } from '@/server/user';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { HeartIcon } from '@repo/ui/icons';
import { useCallback, useState } from 'react';

interface FavoriteButtonProps extends ButtonProps {
  campgroundId: Campground['_id'];
  isFavorite: boolean;
}

const FavoriteButton = ({ campgroundId, isFavorite, className, ...props }: FavoriteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = useCallback(async () => {
    if (!campgroundId || isLoading) return;

    setIsLoading(true);

    try {
      if (isFavorite) {
        await removeFavoriteCampground(campgroundId);
      } else {
        await addFavoriteCampground(campgroundId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [campgroundId, isFavorite, isLoading]);

  return (
    <Button
      className={cn(className)}
      onClick={toggleFavorite}
      disabled={isLoading}
      color="destructive"
      size="icon"
      icon={<HeartIcon className="size-7" fill={isFavorite ? 'currentColor' : 'none'} />}
      {...props}
    />
  );
};

export default FavoriteButton;
