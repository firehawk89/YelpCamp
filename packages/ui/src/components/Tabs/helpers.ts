import { ReactNode } from 'react';

export interface TabItem {
  key: string;
  label: string | ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  className?: string;
}
