'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PAGE_PARAM } from '@/utils/constants/params';
import { cn, generateList } from '@/utils/misc';
import { DEFAULT_PAGE } from '@repo/constants';
import { usePathname, useRouter } from 'next/navigation';
import { HTMLAttributes, useMemo, useCallback } from 'react';
import { routes } from 'src/app/routes';
import useCustomSearchParams from 'src/hooks/useCustomSearchParams';

import PaginationButton from './PaginationButton';

const MAX_SHOWN_PAGES = {
  DESKTOP: 3,
  MOBILE: 2,
};

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  page?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange, className, ...props }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const maxShownPages = isMobile ? MAX_SHOWN_PAGES.MOBILE : MAX_SHOWN_PAGES.DESKTOP;
  const currentPage = page ?? (Number(searchParams.get(PAGE_PARAM)) || DEFAULT_PAGE);

  const { startPage, endPage } = useMemo(() => {
    const start = Math.max(1, Math.min(currentPage - Math.floor(maxShownPages / 2), totalPages - maxShownPages + 1));

    const end = Math.min(totalPages, start + maxShownPages - 1);

    return { startPage: start, endPage: end };
  }, [currentPage, totalPages, maxShownPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;

      const newSearchParamsString = getUpdatedSearchParamsString({ [PAGE_PARAM]: page });
      onPageChange?.(page);

      router.push(routes.custom(pathname, newSearchParamsString));
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

      {generateList(endPage - startPage + 1, (i) => {
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
