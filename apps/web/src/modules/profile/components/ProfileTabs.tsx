'use client';

import { routes } from '@/app/routes';
import { HeartIcon, ReviewIcon } from '@repo/ui/icons';
import Tabs from '@repo/ui/tabs';
import { TabItem } from '@repo/ui/tabs/helpers';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const ProfileTabs = () => {
  const t = useTranslations('pages.profile.tabs');
  const pathname = usePathname();

  const isProfileOverviewPage = pathname === routes.profile();
  const isProfileReviewsPage = pathname === routes.profile('reviews');
  const isProfileFavoritesPage = pathname === routes.profile('favorites');

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: 'overview',
        label: t('overview'),
        href: '/profile',
        isActive: isProfileOverviewPage,
      },
      {
        key: 'reviews',
        label: t('reviews'),
        href: '/profile/reviews',
        isActive: isProfileReviewsPage,
        icon: <ReviewIcon className="size-5" />,
      },
      {
        key: 'favorites',
        label: t('favorites'),
        href: '/profile/favorites',
        isActive: isProfileFavoritesPage,
        icon: <HeartIcon />,
      },
    ],
    [isProfileFavoritesPage, isProfileOverviewPage, isProfileReviewsPage, t]
  );

  return <Tabs items={tabItems} />;
};

export default ProfileTabs;
