'use client';

import ConfirmationModal from '@/components/ConfirmationModal';
import ThreeDotMenu from '@/components/ThreeDotMenu';
import { deleteReview } from '@/server/reviews';
import { Review } from '@/types/review';
import { DeleteIcon } from '@repo/ui/icons';
import { SelectOption } from '@repo/ui/select';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ReviewMenuProps {
  reviewId: Review['_id'];
}

const ReviewMenu = ({ reviewId }: ReviewMenuProps) => {
  const t = useTranslations('pages.campground.reviews');

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
      label: t('actions.delete'),
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
        title={t('deleteModal.title')}
        description={t('deleteModal.description')}
        onConfirm={handleDeleteReview}
        onClose={() => setIsReviewModalOpen(false)}
        isLoading={isLoading}
      />
    </>
  );
};

export default ReviewMenu;
