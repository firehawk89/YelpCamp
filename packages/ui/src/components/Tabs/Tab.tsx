import { cn } from '@/utils/misc';
import { PropsWithChildren } from 'react';

import { TabConfig } from './helpers';
import { tabVariants } from './variants';

interface TabProps extends PropsWithChildren {
  tabConfig: TabConfig;
}

const Tab = ({ tabConfig, ...props }: TabProps) => {
  const { label, icon: Icon, count = 0, variant, active, disabled, className } = tabConfig;

  const { base, icon: iconClass, text, badge: badgeClass } = tabVariants({ variant, active, disabled });

  const content = (
    <>
      {Icon && <Icon className={iconClass()} />}
      <span className={text()}>{label}</span>
      <span className={badgeClass()}>{count}</span>
    </>
  );

  if ('href' in tabConfig) {
    return (
      <a className={cn(base(), className)} href={tabConfig.href} aria-disabled={disabled} {...props}>
        {content}
      </a>
    );
  } else {
    return (
      <button
        className={cn(base(), className)}
        onClick={tabConfig.onClick}
        type="button"
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
};

export default Tab;
