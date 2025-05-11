export const routes = {
  home: () => '/',
  campgrounds: {
    all: (searchParamsString?: string) => (searchParamsString ? `/campgrounds?${searchParamsString}` : '/campgrounds'),
    new: () => '/campgrounds/new',
  },
  campground: {
    view: (slug: string) => `/campgrounds/${slug}`,
    edit: (slug: string) => `/campgrounds/${slug}/edit`,
  },
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  profile: (subPage?: 'reviews' | 'favorites') => (subPage ? `/profile/${subPage}` : '/profile'),
  custom: (pathname: string, searchParamsString?: string) =>
    searchParamsString ? `${pathname}?${searchParamsString}` : pathname,
};
