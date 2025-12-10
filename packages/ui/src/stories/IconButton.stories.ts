import type { Meta, StoryObj } from '@storybook/react-vite';

import IconButton, { iconButtonVariants } from '@/components/IconButton';
import { PlusIcon } from '@/icons';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'If true, the icon button will be disabled and a loading icon will be displayed.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the icon button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: Object.keys(iconButtonVariants.variants.variant),
      description: 'The variant of the icon button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    color: {
      control: 'select',
      options: Object.keys(iconButtonVariants.variants.color),
      description: 'The color of the icon button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(iconButtonVariants.variants.size),
      description: 'The size of the icon button',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: PlusIcon,
    variant: 'primary',
    color: 'primary',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default icon button component displaying an icon.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    icon: PlusIcon,
    variant: 'outline',
    color: 'secondary',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'The outline icon button component displaying an icon.',
      },
    },
  },
};

export const Transparent: Story = {
  args: {
    icon: PlusIcon,
    variant: 'transparent',
    color: 'destructive',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'The transparent icon button component displaying an icon.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    icon: PlusIcon,
    variant: 'primary',
    color: 'primary',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'The large icon button component displaying an icon.',
      },
    },
  },
};
