import { tv } from 'tailwind-variants';

export const progressBarVariants = tv({
  slots: {
    container: 'w-full flex flex-col gap-1',
    label: 'text-sm font-medium text-gray-800',
    progressBar: 'w-full rounded-[1.25rem] bg-gray-100 relative overflow-hidden',
    progressBarInner: 'absolute top-0 left-0 h-full bg-primary',
    metadataContainer: 'flex items-baseline gap-2 justify-between text-sm font-medium',
    metadata: 'text-gray-400',
    percentage: 'ml-auto text-gray-600',
  },
  variants: {
    size: {
      default: {
        progressBar: 'h-3',
      },
      sm: {
        progressBar: 'h-2',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
