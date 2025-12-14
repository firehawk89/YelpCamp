import type { Meta, StoryObj } from '@storybook/react-vite';

import { progressCircleVariants } from '@/components/ProgressCircle';
import ProgressCircle from '@/components/ProgressCircle';

const meta = {
  title: 'Atoms/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(progressCircleVariants.variants.size),
      description: 'The size of the progress circle',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    percentage: {
      control: 'number',
      min: 0,
      max: 100,
      description: 'The percentage of the progress circle',
    },
  },
} satisfies Meta<typeof ProgressCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 63,
  },
  parameters: {
    docs: {
      description: {
        story: 'The progress circle component displaying a percentage.',
      },
    },
  },
};
