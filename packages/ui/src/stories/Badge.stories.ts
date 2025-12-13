import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge, { badgeVariants } from '@/components/Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.variant),
      description: 'The variant of the badge',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    color: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.color),
      description: 'The color of the badge',
      table: {
        defaultValue: { summary: 'orange' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.size),
      description: 'The size of the badge',
      table: {
        defaultValue: { summary: 'sm' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default badge component displaying a label.',
      },
    },
  },
};

export const Accent: Story = {
  args: {
    label: 'Accent Badge',
    variant: 'accent',
    color: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: 'The accent badge component displaying a label.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline Badge',
    variant: 'outline',
    color: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'The outline badge component displaying a label.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    label: 'Small Badge',
    variant: 'filled',
    color: 'neutral',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'The small badge component displaying a label.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    label: 'Large Badge',
    variant: 'filled',
    color: 'orange',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'The large badge component displaying a label.',
      },
    },
  },
};
