export const routes = {
  home: () => '/',
  campgrounds: (searchParamsString?: string) =>
    searchParamsString ? `/campgrounds?${searchParamsString}` : '/campgrounds',
  campground: (slug: string) => `/campgrounds/${slug}`,
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  profile: (subPage?: 'reviews' | 'favorites') => (subPage ? `/profile/${subPage}` : '/profile'),
  custom: (pathname: string, searchParamsString?: string) =>
    searchParamsString ? `${pathname}?${searchParamsString}` : pathname,
};
