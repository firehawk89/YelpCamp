import type { Meta, StoryObj } from '@storybook/react-vite';

import Button, { buttonVariants } from '@/components/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
    variant: 'primary',
    color: 'secondary',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    color: 'secondary',
    children: 'Button',
  },
};

export const Accent: Story = {
  args: {
    variant: 'primary',
    color: 'primary',
    size: 'lg',
    children: 'Button',
  },
};

export const IconSmall: Story = {
  args: {
    variant: 'primary',
    color: 'info',
    size: 'compact',
    children: 'Button',
  },
};

export const Icon: Story = {
  args: {
    variant: 'primary',
    color: 'success',
    size: 'default',
    children: 'Button',
  },
};
