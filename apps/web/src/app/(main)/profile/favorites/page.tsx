import { getSessionUser } from '@/server/session';

export default async function ProfileFavorites() {
  const user = await getSessionUser();
  //   const userReviews = user ? await getUserReviews(user?._id) : null;

  //   console.log('userReviews', userReviews);

  return <div>Hey there</div>;
}
