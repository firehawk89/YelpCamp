import { tv } from 'tailwind-variants';

export const badgeVariants = tv({
  base: 'flex items-center justify-center gap-0.5 text-center font-medium rounded-xl border border-transparent transition-colors disabled:pointer-events-none',
  variants: {
    variant: {
      filled: 'text-shades-white disabled:bg-gray',
      accent: 'disabled:bg-gray-300 disabled:text-gray',
      outline: 'bg-transparent border disabled:text-gray disabled:border-gray',
    },
    size: {
      sm: 'px-2 text-xs',
      default: 'px-3 py-0.5 text-sm',
      lg: 'px-3 py-1 text-sm',
    },
    color: {
      orange: '',
      blue: '',
      success: '',
      warning: '',
      error: '',
      neutral: '',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'orange',
      className: 'bg-primary',
    },
    {
      variant: 'filled',
      color: 'blue',
      className: 'bg-secondary',
    },
    {
      variant: 'filled',
      color: 'success',
      className: 'bg-success',
    },
    {
      variant: 'filled',
      color: 'warning',
      className: 'text-shades-black bg-warning',
    },
    {
      variant: 'filled',
      color: 'error',
      className: 'bg-error',
    },
    {
      variant: 'filled',
      color: 'neutral',
      className: 'bg-neutral-900',
    },

    {
      variant: 'accent',
      color: 'orange',
      className: 'bg-primary-50 text-primary-700',
    },
    {
      variant: 'accent',
      color: 'blue',
      className: 'bg-secondary-50 text-secondary-700',
    },
    {
      variant: 'accent',
      color: 'success',
      className: 'bg-success-50 text-success-700',
    },
    {
      variant: 'accent',
      color: 'warning',
      className: 'bg-warning-50 text-warning-700',
    },
    {
      variant: 'accent',
      color: 'error',
      className: 'bg-error-50 text-error-700',
    },
    {
      variant: 'accent',
      color: 'neutral',
      className: 'bg-neutral-50 text-neutral-700',
    },

    {
      variant: 'outline',
      color: 'orange',
      className: 'text-primary-700 border-primary-700',
    },
    {
      variant: 'outline',
      color: 'blue',
      className: 'text-secondary-700 border-secondary-700',
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'text-success-700 border-success-700',
    },
    {
      variant: 'outline',
      color: 'warning',
      className: 'text-warning-700 border-warning-700',
    },
    {
      variant: 'outline',
      color: 'error',
      className: 'text-error-700 border-error-700',
    },
    {
      variant: 'outline',
      color: 'neutral',
      className: 'text-neutral-700 border-neutral-700',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'default',
    color: 'orange',
  },
});
