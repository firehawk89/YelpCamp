import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar, { avatarVariants } from '../components/Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(avatarVariants.variants.size),
      description: 'The size of the avatar',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: 'text',
      description: 'The URL of the avatar image',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the avatar image',
      table: {
        defaultValue: { summary: 'Avatar' },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/mock-avatar.png',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default avatar component displaying an image.',
      },
    },
  },
};

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When no source is provided, a placeholder icon is displayed.',
      },
    },
  },
};
