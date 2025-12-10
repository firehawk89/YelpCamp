import type { Meta, StoryObj } from '@storybook/react-vite';

import Alert, { alertVariants } from '@/components/Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(alertVariants.variants.variant),
      description: 'The variant of the alert',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(alertVariants.variants.size),
      description: 'The size of the avatar',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Here’s the alert info title',
  },
  parameters: {
    docs: {
      description: {
        story: 'The alert component displaying a title.',
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    title: 'You won!',
    description: 'You have won the lottery. You are now a millionaire.',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: 'The alert component displaying a title and a description.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    title: 'You lost!',
    description: 'You have lost the lottery. You are now a poor person.',
    variant: 'error',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'The large alert component displaying a title, a description, and a CTA.',
      },
    },
  },
};

export const WithCTA: Story = {
  args: {
    title: 'You won!',
    description: 'You have won the lottery. You are now a millionaire.',
    variant: 'success',
    cta: {
      primary: {
        text: 'View details',
        onClick: () => {
          console.log('View details');
        },
      },
      secondary: {
        text: 'Dismiss',
        onClick: () => {
          console.log('Dismiss');
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'The alert component displaying a title, a description, and a CTA.',
      },
    },
  },
};
