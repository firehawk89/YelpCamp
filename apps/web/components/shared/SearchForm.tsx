'use client';

import { SEARCH_PARAM } from '@/utils/constants';
import { cn, getSearchParamsString } from '@/utils/misc';
import Button from '@repo/ui/button';
import { SearchIcon } from '@repo/ui/icons';
import Input from '@repo/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, FormEvent, FormHTMLAttributes } from 'react';

export interface SearchFormProps extends FormHTMLAttributes<HTMLFormElement> {
  label?: string;
}

const SearchForm: FC<SearchFormProps> = ({ className, label, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get(SEARCH_PARAM) || '';

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get(SEARCH_PARAM);

    const params = { [SEARCH_PARAM]: search };
    const searchParamsString = getSearchParamsString(params);

    router.push(pathname + (searchParamsString ? `?${searchParamsString}` : ''));
  };

  return (
    <form className={cn('w-full flex flex-col gap-2', className)} onSubmit={handleSearch} {...props}>
      <label className={cn('font-medium', !label && 'sr-only')} htmlFor={SEARCH_PARAM}>
        {label ? label : 'Search'}
      </label>

      <div className="flex items-center gap-2">
        <Input id={SEARCH_PARAM} name={SEARCH_PARAM} type="text" placeholder="Search" defaultValue={defaultValue} />
        <Button variant="outline" icon={<SearchIcon />} />
      </div>
    </form>
  );
};

export default SearchForm;
