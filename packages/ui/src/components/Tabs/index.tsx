import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { TabConfig } from './helpers';
import Tab from './tab';
import { tabVariants } from './variants';

export interface TabsProps extends HTMLAttributes<HTMLDivElement>, Pick<VariantProps<typeof tabVariants>, 'variant'> {
  items: TabConfig[];
}

const Tabs = ({ items, className, variant, ...props }: TabsProps) => {
  const { list } = tabVariants({ variant });

  return (
    <div className={cn(list(), className)} {...props}>
      {items.map((tabConfig) => (
        <Tab key={tabConfig.key} tabConfig={{ ...tabConfig, variant }} />
      ))}
    </div>
  );
};

export default Tabs;
