import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@/components/Button';
import ButtonGroup, { ButtonGroupProps, buttonGroupVariants, GroupChildProps } from '@/components/ButtonGroup';
import { ArrowLeftIcon, ArrowRightIcon } from '@/icons';
import { Children, cloneElement, isValidElement, useState } from 'react';

const InteractiveButtonGroup = (props: ButtonGroupProps) => {
  const [activeKey, setActiveKey] = useState<string | null | undefined>(props.children[0]?.key);

  return (
    <ButtonGroup {...props}>
      {Children.map(props.children, (child) => {
        if (!isValidElement<GroupChildProps>(child)) return null;
        const key = child.key;

        return cloneElement(child, {
          isActive: !!key && activeKey === key,
          onClick: () => setActiveKey(key),
        });
      })}
    </ButtonGroup>
  );
};

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
  render: (args) => <InteractiveButtonGroup {...args} />,
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
  render: (args) => <InteractiveButtonGroup {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'The button group component displaying two buttons in a vertical orientation.',
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
  render: (args) => <InteractiveButtonGroup {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'The button group component displaying multiple buttons with disabled buttons.',
      },
    },
  },
};

export const WithMultipleButtons: Story = {
  args: {
    children: [
      <Button key="first" icon={ArrowLeftIcon} iconPosition="left">
        First
      </Button>,
      <Button key="second">Second</Button>,
      <Button key="middle">Third</Button>,
      <Button key="last" icon={ArrowRightIcon} iconPosition="right">
        Fourth
      </Button>,
    ],
  },
  render: (args) => <InteractiveButtonGroup {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'The button group component displaying multiple buttons.',
      },
    },
  },
};
