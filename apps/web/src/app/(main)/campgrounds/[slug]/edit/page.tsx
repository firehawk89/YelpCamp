import { routes } from '@/app/routes';
import CampgroundForm from '@/modules/campgrounds/components/CampgroundForm';
import { fetchCampground } from '@/server/campgrounds';
import { getSessionUser } from '@/server/session';
import { notFound, redirect } from 'next/navigation';

interface CampgroundPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Campground({ params }: CampgroundPageProps) {
  const user = await getSessionUser();
  const { slug } = await params;

  const { result: campground, error: campgroundError } = await fetchCampground(slug);

  if (!campground) {
    notFound();
  }

  if (campgroundError) {
    throw new Error(typeof campgroundError === 'string' ? campgroundError : campgroundError.join(', '));
  }

  if (campground?.author !== user?._id) {
    redirect(routes.campground.view(campground.slug));
  }

  return <CampgroundForm user={user} campground={campground} />;
}
