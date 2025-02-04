'use client';

import { DEFAULT_PAGE, MAX_SHOWN_PAGES, PAGE_PARAM } from '@/utils/constants';
import { cn } from '@/utils/misc';
import useCustomSearchParams from 'hooks/useCustomSearchParams';
import { usePathname, useRouter } from 'next/navigation';
import { FC, HTMLAttributes, useMemo, useCallback } from 'react';

import PaginationButton from './PaginationButton';

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  page?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, totalPages, onPageChange, className, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const currentPage = page ?? (Number(searchParams.get(PAGE_PARAM)) || DEFAULT_PAGE);

  const { startPage, endPage } = useMemo(() => {
    const start = Math.max(
      1,
      Math.min(currentPage - Math.floor(MAX_SHOWN_PAGES / 2), totalPages - MAX_SHOWN_PAGES + 1)
    );

    const end = Math.min(totalPages, start + MAX_SHOWN_PAGES - 1);

    return { startPage: start, endPage: end };
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;

      const newSearchParamsString = getUpdatedSearchParamsString({ [PAGE_PARAM]: page });
      onPageChange?.(page);

      router.replace(pathname + (newSearchParamsString ? `?${newSearchParamsString}` : ''));
    },
    [getUpdatedSearchParamsString, onPageChange, pathname, router, totalPages]
  );

  return (
    <div className={cn('flex items-center justify-center gap-4', className)} {...props}>
      <PaginationButton
        buttonType="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      />

      {startPage > 1 && (
        <>
          <PaginationButton onClick={() => handlePageChange(1)}>1</PaginationButton>
          {startPage > 2 && <span className="self-end tracking-widest">...</span>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = i + startPage;

        return (
          <PaginationButton key={page} onClick={() => handlePageChange(page)} isActive={page === currentPage}>
            {page}
          </PaginationButton>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="self-end tracking-widest">...</span>}
          <PaginationButton onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationButton>
        </>
      )}

      <PaginationButton
        buttonType="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
