'use client';

import { PAGE_PARAM } from '@/utils/constants/params';
import { cn } from '@/utils/misc';
import { DEFAULT_PAGE } from '@repo/constants';
import Button, { ButtonProps } from '@repo/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { routes } from 'src/app/routes';
import useCustomSearchParams from 'src/hooks/useCustomSearchParams';

interface LoadMoreButtonProps extends ButtonProps {
  page?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  setSearchParams?: boolean;
}

const LoadMoreButton = ({
  page,
  totalPages,
  onPageChange,
  setSearchParams = false,
  className,
  ...props
}: LoadMoreButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const currentPage = page ?? (Number(searchParams.get(PAGE_PARAM)) || DEFAULT_PAGE);
  const isDisabled = currentPage >= totalPages;

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (isDisabled || nextPage < 1 || nextPage > totalPages) return;

      onPageChange?.(nextPage);

      if (setSearchParams) {
        const newSearchParamsString = getUpdatedSearchParamsString({ [PAGE_PARAM]: nextPage });
        router.push(routes.custom(pathname, newSearchParamsString), { scroll: false });
      }
    },
    [getUpdatedSearchParamsString, isDisabled, onPageChange, pathname, router, setSearchParams, totalPages]
  );

  return (
    <Button
      className={cn('mx-auto w-fit', className)}
      onClick={() => handlePageChange(currentPage + 1)}
      variant="outline"
      color="accent"
      disabled={isDisabled}
      {...props}
    >
      Load more
    </Button>
  );
};

export default LoadMoreButton;
