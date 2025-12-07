import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';

import { TabItem } from './helpers';
import Tab from './Tab';

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  selectedTab?: TabItem['key'];
}

const Tabs = ({ items, className, ...props }: TabsProps) => (
  <div className={cn('no-scrollbar flex items-center overflow-x-auto', className)} {...props}>
    {items.map(({ key, ...tab }) => (
      <Tab key={key} {...tab}>
        {tab.label}
      </Tab>
    ))}
  </div>
);

export default Tabs;
