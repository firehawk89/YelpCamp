import LoadMoreButton from '@/components/LoadMoreButton';
import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { HTMLAttributes } from 'react';

import Pagination from './Pagination';

interface PaginatedContentProps extends HTMLAttributes<HTMLDivElement> {
  elementsCount: number;
  error: string | null;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => Promise<void>;
  pagination?: boolean;
  emptyStateMessage?: string;
}

const PaginatedContent = ({
  elementsCount,
  error,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  emptyStateMessage = 'No data found',
  children,
  className,
  pagination = true,
  ...props
}: PaginatedContentProps) => {
  const hasData = elementsCount > 0;
  const hasMore = totalPages > 1 && currentPage < totalPages;
  const showEmptyState = !error && !hasData;
  const showContent = !error && hasData;

  return (
    <div className={cn('flex w-full min-w-80 flex-col gap-6', className)} {...props}>
      {showEmptyState && (
        <Alert className="w-full" color="info">
          {emptyStateMessage}
        </Alert>
      )}

      {error && (
        <Alert className="w-full" color="danger">
          {error}
        </Alert>
      )}

      {showContent && children}

      {hasMore &&
        (pagination ? (
          <Pagination className="mt-5" page={currentPage} totalPages={totalPages} />
        ) : (
          <LoadMoreButton
            page={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};

export default PaginatedContent;
