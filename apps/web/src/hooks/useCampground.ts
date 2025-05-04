import { fetchCampground } from '@/server/campgrounds';
import { API_ROUTES } from '@/utils/constants/misc';
import useSWR from 'swr';

const useCampground = (slug: string | null) => {
  const {
    data,
    error: swrError,
    isLoading,
  } = useSWR(slug ? `${API_ROUTES.CAMPGROUNDS}/${slug}` : null, fetchCampground);

  const error = data?.error || swrError;

  return {
    campground: data?.result,
    isLoading: isLoading && !!slug,
    error,
  };
};

export default useCampground;
