export type FeatureIcon = 'map' | 'chat' | 'userGroup';

export interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
}
