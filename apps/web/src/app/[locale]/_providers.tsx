import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default Providers;
