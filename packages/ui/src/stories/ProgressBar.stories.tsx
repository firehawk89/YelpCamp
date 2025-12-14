import type { Meta, StoryObj } from '@storybook/react-vite';

import ProgressBar, { progressBarVariants } from '@/components/ProgressBar';

const meta = {
  title: 'Molecules/ProgressBar',
  component: (props) => <ProgressBar className="min-w-80" {...props} />,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(progressBarVariants.variants.size),
      description: 'The size of the progress bar',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    percentage: {
      control: 'number',
      min: 0,
      max: 100,
      description: 'The percentage of the progress bar',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 70,
  },
  parameters: {
    docs: {
      description: {
        story: 'The progress bar component displaying a percentage.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Progress Bar',
    percentage: 30,
  },
  parameters: {
    docs: {
      description: {
        story: 'The progress bar component displaying a label and a percentage.',
      },
    },
  },
};

export const WithMetadata: Story = {
  args: {
    label: 'Progress Bar',
    percentage: 43,
    metadata: 'Whatever metadata you want to display',
  },
  parameters: {
    docs: {
      description: {
        story: 'The progress bar component displaying a percentage and a custom metadata.',
      },
    },
  },
};
