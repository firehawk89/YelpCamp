'use client';

import { routes } from '@/app/routes';
import Overlay from '@/components/Overlay';
import { User } from '@/types/user';
import Button, { ButtonProps } from '@repo/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ReviewForm from './ReviewForm';

interface AddReviewButtonProps extends Omit<ButtonProps, 'variant'> {
  userId?: User['_id'];
  campgroundName: string;
}

const AddReviewButton = ({ userId, campgroundName, ...props }: AddReviewButtonProps) => {
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

      <Overlay isHidden={!isReviewModalOpen}>
        <div className="container">
          <ReviewForm campgroundName={campgroundName} onClose={() => setIsReviewModalOpen(false)} />
        </div>
      </Overlay>
    </>
  );
};

export default AddReviewButton;
