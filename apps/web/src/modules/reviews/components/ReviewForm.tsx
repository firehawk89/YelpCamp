'use client';

import Rating from '@/components/Rating';
import { createReview } from '@/server/reviews';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import { MAX_REVIEW_BODY_LENGTH, MAX_REVIEW_TITLE_LENGTH } from '@repo/constants';
import Button from '@repo/ui/button';
import Input, { inputVariants } from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import { useTranslations } from 'next-intl';
import { FormHTMLAttributes } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { getReviewFormSchema, ReviewFormFields } from '../schemas/form.schema';

interface ReviewFormProps extends FormHTMLAttributes<HTMLFormElement> {
  campground: Campground;
  onClose: () => void;
}

const ReviewForm = ({ campground, onClose, className, ...props }: ReviewFormProps) => {
  const t = useTranslations('pages.campground.reviews.form');
  const tZod = useTranslations();

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormFields>({ defaultValues: { title: '' }, resolver: zodResolver(getReviewFormSchema(tZod)) });

  const enteredTitleLength = watch('title')?.length || 0;
  const enteredBodyLength = watch('body')?.length || 0;

  const onSubmit: SubmitHandler<ReviewFormFields> = async (formData) => {
    try {
      await createReview(campground._id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit a review', error);
    }
  };

  return (
    <form className={cn('flex flex-col gap-5', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <InputWrapper label={t('rating.label')} inputId="rating" error={errors.rating?.message} required>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => <Rating id="rating" selectable {...field} />}
        />
      </InputWrapper>

      <InputWrapper
        label={t('title.label')}
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
        label={t('body.label')}
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
        {t('actions.submit')}
      </Button>
    </form>
  );
};

export default ReviewForm;
