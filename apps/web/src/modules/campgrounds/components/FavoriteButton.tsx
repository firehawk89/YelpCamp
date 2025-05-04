'use client';

import { routes } from '@/app/routes';
import { addFavoriteCampground, removeFavoriteCampground } from '@/server/user';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { HeartIcon } from '@repo/ui/icons';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface FavoriteButtonProps extends ButtonProps {
  campgroundId: Campground['_id'];
  isFavorite: boolean;
  isLoggedIn?: boolean;
}

const FavoriteButton = ({ campgroundId, isFavorite, isLoggedIn, className, ...props }: FavoriteButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = useCallback(async () => {
    if (!campgroundId || isLoading) return;

    if (!isLoggedIn) {
      router.push(routes.signIn());
      return;
    }

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
  }, [campgroundId, isFavorite, isLoading, isLoggedIn, router]);

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
