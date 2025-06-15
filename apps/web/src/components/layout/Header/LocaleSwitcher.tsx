'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { SUPPORTED_LOCALES } from '@/i18n/routing';
import Button from '@repo/ui/button';
import Select, { SelectOption, SelectProps } from '@repo/ui/select';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const LocaleSwitcher = ({
  className,
  ...props
}: Omit<SelectProps<string, SelectOption>, 'options' | 'containerClassName'>) => {
  const locale = useLocale();

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const localeOptions: SelectOption[] = useMemo(
    () => SUPPORTED_LOCALES.map((locale) => ({ label: locale, value: locale })),
    []
  );

  const selectedOption = useMemo(
    () => localeOptions.find((option) => option.value === locale),
    [locale, localeOptions]
  );

  const handleLocaleChange = (locale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, the runtime check can be skipped.
      { pathname, params },
      { locale }
    );
  };

  return (
    <Select
      className={className}
      listClassName="w-fit items-center"
      options={localeOptions}
      selectedOption={selectedOption}
      onChange={(option) => handleLocaleChange(option.value)}
      renderButton={({ toggleDropdown, selectedOption }) => (
        <Button onClick={toggleDropdown} variant="outline" size="sm">
          {selectedOption?.label.toUpperCase()}
        </Button>
      )}
      position="center"
      {...props}
    />
  );
};

export default LocaleSwitcher;
