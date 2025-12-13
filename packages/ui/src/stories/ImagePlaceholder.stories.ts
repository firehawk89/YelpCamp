import type { Meta, StoryObj } from '@storybook/react-vite';

import ImagePlaceholder from '@/components/ImagePlaceholder';
import { UserIcon } from '@/icons';

const meta = {
  title: 'Atoms/ImagePlaceholder',
  component: ImagePlaceholder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'object',
      description: 'The icon to display in the image placeholder',
    },
  },
} satisfies Meta<typeof ImagePlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default image placeholder component displaying a gray background.',
      },
    },
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: UserIcon,
  },
  parameters: {
    docs: {
      description: {
        story: 'The image placeholder component displaying a custom image icon.',
      },
    },
  },
};
