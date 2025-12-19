import { tv } from 'tailwind-variants';

export const tabVariants = tv({
  slots: {
    list: 'no-scrollbar flex items-center overflow-x-auto',
    base: 'w-fit group relative flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-colors',
    icon: 'shrink-0',
    text: 'text-sm font-medium transition-colors',
    badge: 'px-2 text-sm font-medium rounded-xl transition-colors',
  },
  variants: {
    variant: {
      line: {
        list: 'gap-[3px]',
        base: 'p-4 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:w-full after:content-[""] after:transition-colors',
        icon: 'size-5',
      },
      pill: {
        list: 'gap-4',
        base: 'px-3 py-2.5 rounded-md border',
        icon: 'size-4',
      },
    },
    active: {
      true: {},
      false: {},
    },
    disabled: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: 'line',
      active: true,
      class: {
        base: 'text-primary after:bg-primary',
        text: 'text-primary',
        badge: 'bg-primary text-shades-white',
      },
    },
    {
      variant: 'line',
      active: false,
      class: {
        base: 'text-gray-500 after:bg-gray-200',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-700',
      },
    },
    {
      variant: 'line',
      active: false,
      class: {
        base: 'after:hover:bg-gray-500',
        badge: 'group-hover:bg-primary-50 group-hover:text-primary',
      },
    },
    {
      variant: 'line',
      disabled: true,
      class: {
        base: 'pointer-events-none text-gray-300 after:bg-gray-200 after:hover:bg-gray-200',
        text: 'text-gray-300',
        badge: 'bg-gray-200 text-shades-white',
      },
    },
    {
      variant: 'pill',
      active: true,
      class: {
        base: 'bg-primary-50 border-primary-50 text-primary',
        text: 'text-primary',
        badge: 'bg-primary text-shades-white',
      },
    },
    {
      variant: 'pill',
      active: false,
      class: {
        base: 'text-gray-400 border-gray-300 hover:bg-gray-50 hover:border-gray-50',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-700 group-hover:bg-primary-50 group-hover:text-primary',
      },
    },
    {
      variant: 'pill',
      disabled: true,
      class: {
        base: 'pointer-events-none text-gray-300 after:bg-gray-200 after:hover:bg-gray-200',
        text: 'text-gray-300',
        badge: 'bg-gray-200 text-shades-white',
      },
    },
  ],
  defaultVariants: {
    variant: 'line',
    active: false,
    disabled: false,
  },
});
