import { tv } from 'tailwind-variants';

export const inputVariants = tv({
  slots: {
    label: 'text-gray-900 text-sm font-medium',
    base: 'w-full rounded-md outline-none text-sm text-gray-900 transition-all border placeholder:text-gray-400 disabled:bg-gray-100 disabled:border-gray-300',
    icon: 'absolute top-1/2 -translate-y-1/2 size-5 text-gray-500 pointer-events-none',
    helperText: 'text-sm text-gray-500',
  },
  variants: {
    variant: {
      default: {
        base: 'border-gray-300 hover:border-primary-100 focus:border-primary-200',
      },
      success: {
        base: 'border-success-200',
        icon: 'text-success-500',
        helperText: 'text-success-600',
      },
      error: {
        base: 'border-error-200',
        icon: 'text-error-500',
        helperText: 'text-error-500',
      },
    },
    size: {
      default: {
        base: 'px-3 py-2',
      },
      lg: {
        base: 'p-4',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
