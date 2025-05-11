import { cn } from '@/utils/misc';
import { SelectOption } from '@repo/ui/select';
import Link from 'next/link';

interface UserMenuOptionProps {
  option: SelectOption;
}

const UserMenuOption = ({ option }: UserMenuOptionProps) => {
  const { className, icon, label, href, onClick } = option;

  const optionClassName = cn(
    'hover:bg-accent flex cursor-pointer items-center gap-1 px-3 py-1 text-neutral-600 transition-colors hover:text-white',
    className
  );

  const optionContent = (
    <>
      {icon} {label}
    </>
  );

  return href ? (
    <Link key={label} className={optionClassName} href={href} onClick={onClick}>
      {optionContent}
    </Link>
  ) : (
    <span key={label} className={optionClassName} onClick={onClick}>
      {optionContent}
    </span>
  );
};

export default UserMenuOption;
