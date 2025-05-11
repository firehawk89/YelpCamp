'use client';

import ConfirmationModal from '@/components/ConfirmationModal';
import ThreeDotMenu from '@/components/ThreeDotMenu';
import { deleteReview } from '@/server/reviews';
import { Review } from '@/types/review';
import { DeleteIcon } from '@repo/ui/icons';
import { SelectOption } from '@repo/ui/select';
import { useState } from 'react';

interface ReviewMenuProps {
  reviewId: Review['_id'];
}

const ReviewMenu = ({ reviewId }: ReviewMenuProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteReview = async () => {
    if (!reviewId) {
      setIsReviewModalOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      await deleteReview(reviewId);
    } catch (error) {
      console.error('Error liking review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const options: SelectOption[] = [
    {
      label: 'Delete',
      value: 'delete',
      onClick: () => setIsReviewModalOpen(true),
      className: 'hover:bg-danger hover:text-white',
      icon: <DeleteIcon className="size-5" />,
    },
  ];

  return (
    <>
      <ThreeDotMenu options={options} />

      <ConfirmationModal
        isHidden={!isReviewModalOpen}
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={handleDeleteReview}
        onClose={() => setIsReviewModalOpen(false)}
        isLoading={isLoading}
      />
    </>
  );
};

export default ReviewMenu;
