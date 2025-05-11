import Button from '@repo/ui/button';
import { EllipsisVerticalIcon } from '@repo/ui/icons';
import Select, { SelectOption, SelectProps } from '@repo/ui/select';

export interface ThreeDotMenuProps extends SelectProps<string, SelectOption> {
  containerClassName?: string;
}

const ThreeDotMenu = ({ options, containerClassName, ...props }: ThreeDotMenuProps) => (
  <Select
    className={containerClassName}
    options={options}
    renderButton={({ toggleDropdown }) => <Button icon={<EllipsisVerticalIcon />} onClick={toggleDropdown} />}
    position="right"
    {...props}
  />
);

export default ThreeDotMenu;
