import type { Meta, StoryObj } from '@storybook/react-vite';

import Tabs, { TabsProps } from '@/components/Tabs';
import { TabConfig } from '@/components/Tabs/helpers';
import { tabVariants } from '@/components/Tabs/variants';
import { HomeAltIcon } from '@/icons';
import { useState } from 'react';

const TabsWithState = (args: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(args.items[0]?.key);

  const statefulItems = args.items.map((item: TabConfig) => ({
    ...item,
    active: item.key === selectedTab,
    onClick: () => !item.disabled && setSelectedTab(item.key),
  }));

  return <Tabs {...args} items={statefulItems} />;
};

const tabs: TabConfig[] = [
  {
    key: 'tab1',
    label: 'Tab 1',
    icon: (props) => <HomeAltIcon variant="outline" {...props} />,
    count: 3,
    onClick: () => console.log('Tab 1'),
  },
  {
    key: 'tab2',
    label: 'Tab 2',
    icon: (props) => <HomeAltIcon variant="outline" {...props} />,
    onClick: () => console.log('Tab 2'),
  },
  {
    key: 'tab3',
    label: 'Tab 3',
    icon: (props) => <HomeAltIcon variant="outline" {...props} />,
    disabled: true,
    onClick: () => console.log('Tab 3'),
  },
];

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'The items of the tabs',
    },
    variant: {
      control: 'select',
      options: Object.keys(tabVariants.variants.variant),
      description: 'The variant of the tabs',
      table: {
        defaultValue: { summary: 'line' },
      },
    },
  },
  args: {
    items: tabs,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Line: Story = {
  render: (args) => <TabsWithState {...args} />,
  args: {
    variant: 'line',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default line variant of the tabs component.',
      },
    },
  },
};

export const Pill: Story = {
  render: (args) => <TabsWithState {...args} />,
  args: {
    variant: 'pill',
  },
  parameters: {
    docs: {
      description: {
        story: 'The pill variant of the tabs component.',
      },
    },
  },
};
