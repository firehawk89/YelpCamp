import type { Meta, StoryObj } from '@storybook/react-vite';

import Button, { buttonVariants } from '@/components/Button';
import { PlusIcon } from '@/icons';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'If true, the button will be disabled and a loading icon will be displayed.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.variant),
      description: 'The variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    color: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.color),
      description: 'The color of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.size),
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default button component displaying a label.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    color: 'secondary',
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
    children: 'Transparent Button',
    variant: 'transparent',
    color: 'destructive',
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
    children: 'Large Button',
    variant: 'primary',
    color: 'info',
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

export const WithIcon: Story = {
  args: {
    children: 'Button',
    icon: PlusIcon,
    iconPosition: 'right',
    color: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'The button component displaying an icon and a label.',
      },
    },
  },
};
