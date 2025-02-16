'use client';

import { DEFAULT_PAGE, PAGE_PARAM, SEARCH_PARAM } from '@/utils/constants';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { SearchIcon } from '@repo/ui/icons';
import Input from '@repo/ui/input';
import useCustomSearchParams from 'hooks/useCustomSearchParams';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, FormHTMLAttributes } from 'react';

export interface SearchFormProps extends FormHTMLAttributes<HTMLFormElement> {
  label?: string;
}

const SearchForm = ({ className, label, ...props }: SearchFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const defaultValue = searchParams.get(SEARCH_PARAM) || '';

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get(SEARCH_PARAM);

    if (search === defaultValue) {
      return;
    }

    const params = { [SEARCH_PARAM]: search };
    if (searchParams.has(PAGE_PARAM)) {
      params[PAGE_PARAM] = DEFAULT_PAGE.toString();
    }
    const newSearchParamsString = getUpdatedSearchParamsString(params);

    router.replace(pathname + (newSearchParamsString ? `?${newSearchParamsString}` : ''));
  };

  return (
    <form className={cn('flex w-full flex-col gap-2', className)} onSubmit={handleSearch} {...props}>
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
