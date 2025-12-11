import { tv } from 'tailwind-variants';

export const alertVariants = tv({
  slots: {
    container: 'flex w-fit h-fit max-w-96 border border-l-0 border-gray-200 rounded-r-md overflow-hidden',
    accentLine: 'w-1.5 shrink-0 rounded-l-md',
    contentContainer: 'flex items-start py-3 px-4',
    mainContent: 'flex flex-col',
    iconContainer: 'rounded-lg border',
    icon: '',
    textContent: 'flex-1 flex items-start bg-white',
    title: 'text-sm font-semibold',
    description: 'text-sm text-gray-600',
    closeButton: '',
    ctaButtons: 'flex gap-2',
  },
  variants: {
    variant: {
      default: {
        accentLine: 'bg-secondary-500',
        iconContainer: 'bg-secondary-50 border-secondary-75 text-secondary',
      },
      success: {
        accentLine: 'bg-success-500',
        iconContainer: 'bg-success-50 border-success-75 text-success',
      },
      warning: {
        accentLine: 'bg-warning-500',
        iconContainer: 'bg-warning-50 border-warning-75 text-warning',
      },
      error: {
        accentLine: 'bg-danger-500',
        iconContainer: 'bg-danger-50 border-danger-75 text-danger',
      },
    },
    size: {
      default: {
        contentContainer: 'gap-3',
        mainContent: 'gap-3',
        iconContainer: 'p-1.5',
        icon: 'size-3',
        textContent: 'gap-3',
      },
      lg: {
        contentContainer: 'gap-4',
        mainContent: 'gap-4',
        iconContainer: 'p-2',
        icon: 'size-4',
        textContent: 'gap-4',
        title: 'text-base',
        description: 'text-sm',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
