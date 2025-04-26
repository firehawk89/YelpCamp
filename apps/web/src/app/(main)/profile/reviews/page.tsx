import { routes } from '@/app/routes';
import Reviews from '@/modules/reviews';
import { getSessionUser } from '@/server/session';
import { fetchUserReviews } from '@/server/user';
import { redirect } from 'next/navigation';

export default async function ProfileReviews() {
  const user = await getSessionUser();

  if (!user) {
    return redirect(routes.signIn());
  }

  const { result: reviews, error } = await fetchUserReviews(user._id);

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  return <Reviews reviewsData={reviews} user={user} mode="user" />;
}
