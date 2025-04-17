'use client';

import { routes } from '@/app/routes';
import { HeartIcon, ReviewIcon } from '@repo/ui/icons';
import Tabs from '@repo/ui/tabs';
import { TabItem } from '@repo/ui/tabs/helpers';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const ProfileTabs = () => {
  const pathname = usePathname();

  const isProfileOverviewPage = pathname === routes.profile();
  const isProfileReviewsPage = pathname === routes.profile('reviews');
  const isProfileFavoritesPage = pathname === routes.profile('favorites');

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: 'overview',
        label: 'Overview',
        href: '/profile',
        isActive: isProfileOverviewPage,
      },
      {
        key: 'reviews',
        label: 'Reviews',
        href: '/profile/reviews',
        isActive: isProfileReviewsPage,
        icon: <ReviewIcon className="size-5" />,
      },
      {
        key: 'favorites',
        label: 'Favorites',
        href: '/profile/favorites',
        isActive: isProfileFavoritesPage,
        icon: <HeartIcon />,
      },
    ],
    [isProfileFavoritesPage, isProfileOverviewPage, isProfileReviewsPage]
  );

  return <Tabs items={tabItems} />;
};

export default ProfileTabs;
