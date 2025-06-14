import SearchForm, { SearchFormProps } from '@/components/SearchForm';
import { fetchImage } from '@/server/media';
import { getTranslations } from 'next-intl/server';

interface CampgroundSearchFormProps extends Omit<SearchFormProps, 'selectedImage'> {
  searchImage?: string;
}

const CampgroundSearchForm = async ({ searchImage, ...props }: CampgroundSearchFormProps) => {
  const t = await getTranslations('pages.campgrounds.search');

  const selectedImage = searchImage ? await fetchImage(searchImage) : null;

  return <SearchForm label={t('label')} selectedImage={selectedImage} imageSearch {...props} />;
};

export default CampgroundSearchForm;
