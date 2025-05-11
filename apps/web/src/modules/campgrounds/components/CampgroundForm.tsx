'use client';

import ErrorAlertList from '@/components/ErrorAlertList';
import MultiImageInput from '@/components/MultiImageInput';
import PriceInput from '@/components/PriceInput';
import useImageFileSelect from '@/hooks/useImageFileSelect';
import { createCampground, updateCampground } from '@/server/campgrounds';
import { Campground, CreateCampgroundDTO } from '@/types/campground';
import { User } from '@/types/user';
import { cn, parseErrorMessages } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import { MAX_CAMPGROUND_DESCRIPTION_LENGTH } from '@repo/constants';
import Alert from '@repo/ui/alert';
import Button from '@repo/ui/button';
import Input, { inputVariants } from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import { SelectOption } from '@repo/ui/select';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChangeEvent, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { routes } from 'src/app/routes';

import { CURRENCY_OPTIONS } from '../helpers';
import { CampgroundFormFields, campgroundFormSchema } from '../schemas/form.schema';

const GeocoderInput = dynamic(() => import('@/components/GeocoderInput'), {
  ssr: false,
  loading: () => <Input placeholder="Loading location input..." disabled />,
});

interface CampgroundFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  user: User | null;
  campground?: Campground;
}

const CampgroundForm = ({ user, campground, className, ...props }: CampgroundFormProps) => {
  const router = useRouter();

  const [images, setImages] = useState<string[] | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<SelectOption | undefined>(CURRENCY_OPTIONS[0]);
  const [saveErrors, setSaveErrors] = useState<string[] | null>(null);

  const {
    control,
    register,
    handleSubmit,
    resetField,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<CampgroundFormFields>({
    resolver: zodResolver(campgroundFormSchema),
    defaultValues: {
      title: campground?.title ?? undefined,
      includeSlug: !!campground?.slug,
      slug: campground?.slug ?? undefined,
      price: campground?.price ?? undefined,
      location: campground?.location ?? undefined,
      description: campground?.description ?? undefined,
    },
  });

  const includeSlug = watch('includeSlug');

  const geocoderError =
    errors.location?.message ||
    errors.location?.full_address?.message ||
    errors.location?.coordinates?.latitude?.message ||
    errors.location?.coordinates?.longitude?.message;

  const handleSlugToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setValue('includeSlug', isChecked);

    if (!isChecked) {
      resetField('slug');
    }
  };

  const handleAddImage = (imageUrl: string) => {
    const isAdded = images?.some((img) => img === imageUrl);
    if (!isAdded) {
      setImages((prev) => (prev ? [...prev, imageUrl] : [imageUrl]));
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setImages((prev) => prev?.filter((img) => img !== imageUrl) || null);
    setImageError(null);
  };

  const { handleSelectFile, imageError, setImageError } = useImageFileSelect({
    onImageSourceAdd: handleAddImage,
  });

  const onSubmit: SubmitHandler<CampgroundFormFields> = useCallback(
    async (data) => {
      if (!user?._id) return;
      console.log(data);
      setSaveErrors(null);

      try {
        const { title, slug, price, location, description } = data;
        const campgroundData: CreateCampgroundDTO = {
          title,
          price,
          location,
          description,
          images,
          author: user._id,
        };
        if (includeSlug) {
          campgroundData.slug = slug;
        }

        if (campground) {
          console.log(campgroundData);
          await updateCampground(campground._id, campgroundData);
        } else {
          await createCampground(campgroundData);
        }
        reset();

        router.push(routes.campgrounds.all());
      } catch (error) {
        const errorMessages = parseErrorMessages(error, `Failed to ${campground ? 'update' : 'create'} campground`);
        setSaveErrors(errorMessages);
      }
    },
    [images, includeSlug, reset, router, user?._id, campground]
  );

  useEffect(() => {
    if (campground) {
      const imageUrls = campground.images?.map((image) => image.url);
      setImages(imageUrls ?? null);
    }
  }, [campground]);

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-5">
      <ErrorAlertList errors={saveErrors} />

      <form
        className={cn('flex w-full flex-col gap-5', className)}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        {...props}
      >
        <div className="flex w-full flex-col gap-4">
          <InputWrapper label="Title" inputId="title" error={errors.title?.message} required>
            <Input id="title" {...register('title')} type="text" placeholder="Campground title" />
          </InputWrapper>

          <div className="flex w-fit items-center gap-2.5">
            <Input
              id="includeSlug"
              {...register('includeSlug')}
              type="checkbox"
              checked={includeSlug}
              onChange={handleSlugToggle}
              className="h-4 w-4 cursor-pointer"
            />
            <label htmlFor="includeSlug" className="cursor-pointer text-sm font-medium">
              Custom URL slug
            </label>
          </div>

          {includeSlug && (
            <InputWrapper label="Slug" inputId="slug" required={includeSlug} error={errors.slug?.message}>
              <Input id="slug" {...register('slug')} type="text" placeholder="campground-url-slug" />
            </InputWrapper>
          )}

          <InputWrapper label="Images" inputId="images">
            {imageError && (
              <Alert className="mb-2 w-full" color="danger">
                {imageError}
              </Alert>
            )}

            <MultiImageInput
              images={images ?? []}
              onAddImage={handleSelectFile}
              onImageRemove={handleRemoveImage}
              isError={!!imageError}
            />
          </InputWrapper>

          <div className="flex gap-4">
            <InputWrapper
              className="w-full"
              label="Price"
              inputId="price"
              error={errors.price?.value?.message || errors.price?.currency?.message}
              required
            >
              <PriceInput
                id="price"
                placeholder="Price per night"
                selectedOption={selectedCurrency}
                options={CURRENCY_OPTIONS}
                onOptionChange={setSelectedCurrency}
                register={register}
                valueField="price.value"
                currencyField="price.currency"
              />
            </InputWrapper>

            <InputWrapper className="w-full" label="Location" inputId="location" error={geocoderError} required>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <GeocoderInput
                    value={field.value?.full_address}
                    onChange={(val) => {
                      field.onChange({
                        ...field?.value,
                        full_address: val,
                        coordinates: field.value?.coordinates ?? { latitude: 0, longitude: 0 },
                      });
                    }}
                    onRetrieve={field.onChange}
                    onClear={() => field.onChange(undefined)}
                  />
                )}
              />
            </InputWrapper>
          </div>

          <InputWrapper label="Description" inputId="description" error={errors.description?.message}>
            <textarea
              id="description"
              {...register('description')}
              className={cn('resize-none', inputVariants())}
              placeholder="Campground description"
              maxLength={MAX_CAMPGROUND_DESCRIPTION_LENGTH}
              rows={5}
            />
          </InputWrapper>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            color="info"
            onClick={() => router.push(routes.campgrounds.all())}
          >
            Cancel
          </Button>

          <Button className="w-full" type="submit" variant="outline" color="accent" isLoading={isSubmitting}>
            {campground ? 'Update' : 'Create'} Campground
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampgroundForm;
