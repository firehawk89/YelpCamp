export const routes = {
  home: () => '/',
  campgrounds: (searchParamsString?: string) =>
    searchParamsString ? `/campgrounds?${searchParamsString}` : '/campgrounds',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  profile: (tab?: string) => (tab ? `/profile#${tab}` : '/profile'),
  custom: (pathname: string, searchParamsString?: string) =>
    searchParamsString ? `${pathname}?${searchParamsString}` : pathname,
};
