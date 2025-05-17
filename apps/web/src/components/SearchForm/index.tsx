'use client';

import useImageFileSelect from '@/hooks/useImageFileSelect';
import { uploadImage } from '@/server/media';
import { Image } from '@/types/media';
import { User } from '@/types/user';
import { PAGE_PARAM, SEARCH_IMAGE_PARAM, SEARCH_PARAM } from '@/utils/constants/params';
import { cn } from '@/utils/misc';
import { BASE64_IMAGE_PATTERN, DEFAULT_PAGE } from '@repo/constants';
import { ImageType } from '@repo/types';
import Button from '@repo/ui/button';
import { SearchIcon } from '@repo/ui/icons';
import Input from '@repo/ui/input';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, FormHTMLAttributes, useCallback, useState } from 'react';
import { routes } from 'src/app/routes';
import useCustomSearchParams from 'src/hooks/useCustomSearchParams';

import ImagePreview from './ImagePreview';
import ImageSearchButton from './ImageSearchButton';

export interface SearchFormProps extends FormHTMLAttributes<HTMLFormElement> {
  user?: User | null;
  label?: string;
  selectedImage?: Image | null;
  onSelectImage?: (base64Image: string) => void;
  imageSearch?: boolean;
}

const SearchForm = ({
  user,
  label,
  selectedImage,
  onSelectImage,
  imageSearch,
  className,
  ...props
}: SearchFormProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();
  const defaultValue = searchParams.get(SEARCH_PARAM) || '';
  const searchImageId = searchParams.get(SEARCH_IMAGE_PARAM);

  const { imageSource, setImageSource, handleSelectFile, imageError, setImageError } = useImageFileSelect({
    onImageSourceAdd: onSelectImage,
    minDimension: 16,
  });

  const [isLoading, setIsLoading] = useState(false);

  const resolvedImageSource = imageSource ?? selectedImage?.url ?? null;
  const showImageSearch = imageSearch && !!user;

  const updateSearchParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = { ...params };
      if (searchParams.has(PAGE_PARAM)) {
        newParams[PAGE_PARAM] = DEFAULT_PAGE.toString();
      }
      const newSearchParamsString = getUpdatedSearchParamsString(newParams);
      router.push(routes.custom(pathname, newSearchParamsString));
    },
    [getUpdatedSearchParamsString, pathname, router, searchParams]
  );

  const handleImageRemove = useCallback(() => {
    setImageSource(null);
    setImageError(null);

    const params: Record<string, string> = { [SEARCH_PARAM]: defaultValue };
    params[SEARCH_IMAGE_PARAM] = '';

    updateSearchParams(params);
  }, [defaultValue, setImageError, setImageSource, updateSearchParams]);

  const handleSearch = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setImageError(null);
      setIsLoading(true);

      try {
        const formData = new FormData(e.currentTarget);
        const search = formData.get(SEARCH_PARAM);

        if (search === defaultValue && !resolvedImageSource) {
          return;
        }

        const params: Record<string, string> = { [SEARCH_PARAM]: search as string };

        if (imageSearch && resolvedImageSource) {
          if (BASE64_IMAGE_PATTERN.test(resolvedImageSource)) {
            const searchImage = await uploadImage(resolvedImageSource, ImageType.SEARCH);
            params[SEARCH_IMAGE_PARAM] = searchImage._id;
          } else {
            params[SEARCH_IMAGE_PARAM] = selectedImage?._id ?? '';
          }
        } else {
          params[SEARCH_IMAGE_PARAM] = '';
        }

        updateSearchParams(params);
      } catch (error) {
        console.log(error);
        setImageError('Failed to upload search image');
      } finally {
        setIsLoading(false);
      }
    },
    [defaultValue, imageSearch, resolvedImageSource, selectedImage?._id, setImageError, updateSearchParams]
  );

  return (
    <form className={cn('flex w-full flex-col gap-2', className)} onSubmit={handleSearch} {...props}>
      <div className="flex items-center justify-between gap-5">
        <label className={cn('text-lg font-semibold', !label && 'sr-only')} htmlFor={SEARCH_PARAM}>
          {label ? label : 'Search'}
        </label>

        {!user && (
          <Link href={routes.signUp()} className="hover:text-accent text-sm text-neutral-500 transition-colors">
            Sign up to unlock image search
          </Link>
        )}
      </div>

      <div className="relative flex gap-2">
        {showImageSearch && (
          <ImagePreview
            imageSource={resolvedImageSource}
            searchImageId={searchImageId}
            onImageRemove={handleImageRemove}
          />
        )}

        <Input
          id={SEARCH_PARAM}
          name={SEARCH_PARAM}
          className={cn(resolvedImageSource && !!user && 'pl-14')}
          type="text"
          placeholder={imageSearch && !!resolvedImageSource ? 'Add to image search' : 'Search'}
          defaultValue={defaultValue}
          size="lg"
        />

        {showImageSearch && <ImageSearchButton onSelectImage={handleSelectFile} disabled={isLoading} />}

        <Button
          className="aspect-square w-10 shrink-0"
          variant="accent"
          icon={<SearchIcon />}
          type="submit"
          isLoading={isLoading}
        />
      </div>

      {imageError && <p className="text-danger text-sm">{imageError}</p>}
    </form>
  );
};

export default SearchForm;
