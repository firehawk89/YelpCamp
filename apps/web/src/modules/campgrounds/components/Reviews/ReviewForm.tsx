'use client';

import Rating from '@/components/Rating';
import { useClickOutside } from '@/hooks/useClickOutside';
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
  campgroundName: string;
  onClose: () => void;
}

const ReviewForm = ({ campgroundName, onClose, className, ...props }: ReviewFormProps) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormFields>({ resolver: zodResolver(reviewFormSchema) });

  const reviewFormRef = useClickOutside<HTMLDivElement>(() => onClose());

  const enteredTitleLength = watch('title')?.length || 0;
  const enteredBodyLength = watch('body')?.length || 0;

  const onSubmit: SubmitHandler<ReviewFormFields> = async (formData) => {
    console.log('formData', formData);
  };

  return (
    <Card
      ref={reviewFormRef}
      className={cn('flex w-full min-w-80 max-w-[50%] flex-col gap-5', className)}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex justify-between gap-4">
        <h3 className="text-xl font-semibold">Review the {campgroundName}</h3>
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

      <Button className="mt-1.5" variant="accent" disabled={isSubmitting} type="submit">
        Submit a review
      </Button>
    </Card>
  );
};

export default ReviewForm;
