'use client';

import Overlay from '@/components/Overlay';
import Button, { ButtonProps } from '@repo/ui/button';
import { useState } from 'react';

import ReviewForm from './ReviewForm';

interface AddReviewButtonProps extends Omit<ButtonProps, 'variant'> {
  campgroundName: string;
}

const AddReviewButton = ({ campgroundName, ...props }: AddReviewButtonProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsReviewModalOpen(true)} variant="accent" {...props}>
        Add a review
      </Button>

      <Overlay isHidden={!isReviewModalOpen}>
        <ReviewForm campgroundName={campgroundName} onClose={() => setIsReviewModalOpen(false)} />
      </Overlay>
    </>
  );
};

export default AddReviewButton;
