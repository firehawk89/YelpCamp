export const routes = {
  home: () => '/',
  campgrounds: (searchParamsString?: string) =>
    searchParamsString ? `/campgrounds?${searchParamsString}` : '/campgrounds',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  custom: (pathname: string, searchParamsString?: string) =>
    searchParamsString ? `${pathname}?${searchParamsString}` : pathname,
};
