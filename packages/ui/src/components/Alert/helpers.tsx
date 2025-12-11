import { IconProps, InfoTriangleIcon, MinusCircleIcon } from '@/icons';
import { CheckCircleIcon } from '@/icons/CheckCircleIcon';
import { ComponentType } from 'react';

import { buttonVariants } from '../Button';
import { alertVariants } from './variants';

export const AlertIconMap: Record<keyof typeof alertVariants.variants.variant, ComponentType<IconProps>> = {
  default: CheckCircleIcon,
  success: CheckCircleIcon,
  warning: InfoTriangleIcon,
  error: MinusCircleIcon,
};

export const PrimaryCtaButtonColorMap: Record<
  keyof typeof alertVariants.variants.variant,
  keyof typeof buttonVariants.variants.color
> = {
  default: 'info',
  success: 'success',
  warning: 'warning',
  error: 'destructive',
};
