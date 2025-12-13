import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@/components/Button';
import ButtonGroup, { buttonGroupVariants } from '@/components/ButtonGroup';

const meta = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: Object.keys(buttonGroupVariants.variants.orientation),
      description: 'The orientation of the button group',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [<Button key="first">First</Button>, <Button key="last">Last</Button>],
  },
  parameters: {
    docs: {
      description: {
        story: 'The default button group component displaying two buttons.',
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    children: [<Button key="first">First</Button>, <Button key="last">Last</Button>],
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'The button group component displaying two buttons in a vertical orientation.',
      },
    },
  },
};

export const WithMultipleButtons: Story = {
  args: {
    children: [
      <Button key="first">First</Button>,
      <Button key="middle">Middle</Button>,
      <Button key="last">Last</Button>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'The button group component displaying multiple buttons.',
      },
    },
  },
};

export const WithDisabledButtons: Story = {
  args: {
    children: [
      <Button key="first" disabled>
        First
      </Button>,
      <Button key="middle" disabled>
        Middle
      </Button>,
      <Button key="last">Last</Button>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'The button group component displaying multiple buttons with disabled buttons.',
      },
    },
  },
};
