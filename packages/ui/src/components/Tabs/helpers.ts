import { IconProps } from '@/icons';
import { ComponentType } from 'react';
import { VariantProps } from 'tailwind-variants';

import { tabVariants } from './variants';

type TabConfigBase = VariantProps<typeof tabVariants> & {
  key: string;
  label: string;
  icon?: ComponentType<IconProps>;
  count?: number;
  className?: string;
};

export type TabConfig = TabConfigBase &
  (
    | {
        href: string;
      }
    | {
        onClick: () => void;
      }
  );
