import SearchForm, { SearchFormProps } from '@/components/SearchForm';
import { fetchImage } from '@/server/media';

interface CampgroundSearchFormProps extends SearchFormProps {
  searchImage?: string;
}

const CampgroundSearchForm = async ({ searchImage, ...props }: CampgroundSearchFormProps) => {
  const selectedImage = searchImage ? await fetchImage(searchImage) : null;

  return <SearchForm label="Search Campgrounds" selectedImage={selectedImage?.url} imageSearch {...props} />;
};

export default CampgroundSearchForm;
