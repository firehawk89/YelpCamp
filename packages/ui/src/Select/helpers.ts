export type DropdownPosition = 'right' | 'left';

export const dropdownPositionClasses: Record<DropdownPosition, string> = {
  right: 'right-0',
  left: 'left-0',
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
