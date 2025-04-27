'use client';

import { routes } from '@/app/routes';
import Modal from '@/components/Modal';
import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import Button, { ButtonProps } from '@repo/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ReviewForm from './ReviewForm';

interface AddReviewButtonProps extends Omit<ButtonProps, 'variant'> {
  userId?: User['_id'];
  campground: Campground;
}

const AddReviewButton = ({ userId, campground, ...props }: AddReviewButtonProps) => {
  const router = useRouter();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReviewButtonClick = () => {
    if (!userId) {
      router.push(routes.signIn());
      return;
    }
    setIsReviewModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleReviewButtonClick} variant="accent" {...props}>
        Add a review
      </Button>

      <Modal
        isHidden={!isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={`Review the ${campground.title}`}
      >
        <ReviewForm campground={campground} onClose={() => setIsReviewModalOpen(false)} />
      </Modal>
    </>
  );
};

export default AddReviewButton;
