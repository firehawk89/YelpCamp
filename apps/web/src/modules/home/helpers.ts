export type FeatureIcon = 'map' | 'chat' | 'userGroup';

export interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: 'map',
    title: 'Find Perfect Spots',
    description:
      'Discover handpicked campgrounds with detailed information about facilities, location, and nearby attractions.',
  },
  {
    icon: 'chat',
    title: 'Share Your Experience',
    description:
      'Upload photos, write reviews, and help fellow campers make informed decisions about their next adventure.',
  },
  {
    icon: 'userGroup',
    title: 'Join the Community',
    description:
      'Connect with fellow outdoor enthusiasts, share tips, and get recommendations from experienced campers.',
  },
];
