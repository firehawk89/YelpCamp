import { routes } from '@/app/routes';
import FavoriteCampgrounds from '@/modules/campgrounds/components/FavoriteCampgrounds';
import { getSessionUser } from '@/server/session';
import { fetchUserFavoriteCampgrounds } from '@/server/user';
import { redirect } from 'next/navigation';

export default async function ProfileFavorites() {
  const user = await getSessionUser();

  if (!user) {
    return redirect(routes.signIn());
  }

  const { result: favoriteCampgroundsData, error } = await fetchUserFavoriteCampgrounds();

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  return <FavoriteCampgrounds user={user} campgroundsData={favoriteCampgroundsData} error={error} />;
}
