export type DropdownPosition = 'right' | 'left' | 'center';

export const dropdownPositionClasses: Record<DropdownPosition, string> = {
  right: 'right-0',
  left: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
};

export interface SelectButtonProps<T> {
  selectedOption?: T;
  isOpen: boolean;
  toggleDropdown: () => void;
}

export interface SelectOptionProps<T> {
  option: T;
  isSelected: boolean;
  closeDropdown: () => void;
}
