'use client';

import Rating from '@/components/Rating';
import { useClickOutside } from '@/hooks/useClickOutside';
import { createReview } from '@/server/reviews';
import { Campground } from '@/types/campground';
import { MAX_REVIEW_BODY_LENGTH, MAX_REVIEW_TITLE_LENGTH } from '@/utils/constants';
import { cn } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import { CloseIcon } from '@repo/ui/icons';
import Input, { inputVariants } from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ReviewFormFields, reviewFormSchema } from './helpers';

interface ReviewFormProps extends CardProps {
  campground: Campground;
  onClose: () => void;
}

const ReviewForm = ({ campground, onClose, className, ...props }: ReviewFormProps) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormFields>({ defaultValues: { title: null }, resolver: zodResolver(reviewFormSchema) });

  const reviewFormRef = useClickOutside<HTMLDivElement>(() => onClose());

  const enteredTitleLength = watch('title')?.length || 0;
  const enteredBodyLength = watch('body')?.length || 0;

  const onSubmit: SubmitHandler<ReviewFormFields> = async (formData) => {
    try {
      await createReview(campground._id, formData);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Card
      ref={reviewFormRef}
      className={cn('mx-auto flex w-full max-w-[640px] flex-col gap-5', className)}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="mt-1 text-xl font-semibold">Review the {campground.title}</h3>
        <Button className="shrink-0" onClick={onClose} icon={<CloseIcon />} />
      </div>

      <InputWrapper label="Rating" inputId="rating" error={errors.rating?.message} required>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => <Rating id="rating" selectable {...field} />}
        />
      </InputWrapper>

      <InputWrapper
        label="Title"
        inputId="title"
        error={errors.title?.message}
        helperElement={
          <span className="ml-auto text-sm text-neutral-500">
            {enteredTitleLength} / {MAX_REVIEW_TITLE_LENGTH}
          </span>
        }
      >
        <Input id="title" {...register('title')} type="text" maxLength={MAX_REVIEW_TITLE_LENGTH} />
      </InputWrapper>

      <InputWrapper
        label="Describe your experience"
        inputId="body"
        error={errors.body?.message}
        required
        helperElement={
          <span className="ml-auto text-sm text-neutral-500">
            {enteredBodyLength} / {MAX_REVIEW_BODY_LENGTH}
          </span>
        }
      >
        <textarea
          id="body"
          {...register('body')}
          className={cn('resize-none', inputVariants())}
          maxLength={MAX_REVIEW_BODY_LENGTH}
          rows={5}
        ></textarea>
      </InputWrapper>

      <Button className="mt-1.5" type="submit" isLoading={isSubmitting} variant="accent">
        Submit a review
      </Button>
    </Card>
  );
};

export default ReviewForm;
