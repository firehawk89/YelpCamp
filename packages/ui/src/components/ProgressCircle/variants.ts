import { tv } from 'tailwind-variants';

export const progressCircleVariants = tv({
  slots: {
    container: 'relative flex items-center justify-center',
    percentage: 'font-semibold text-shades-black absolute',
  },
  variants: {
    size: {
      xs: {
        container: 'size-12',
        percentage: 'text-xs',
      },
      sm: {
        container: 'size-14',
        percentage: 'text-xs',
      },
      default: {
        container: 'size-[4.5rem]',
        percentage: 'text-sm',
      },
      lg: {
        container: 'size-[5.625rem]',
        percentage: 'text-base',
      },
      xl: {
        container: 'size-[7.5rem]',
        percentage: 'text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
