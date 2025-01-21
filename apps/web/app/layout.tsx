import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import HeaderContent from '@/components/layout/Header/HeaderContent';
import '@repo/tailwind-config/styles';
import { ReactNode } from 'react';

import { noto_sans } from './fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative bg-neutral-100 ${noto_sans.variable} font-primary`}>
        <div className="min-h-dvh flex flex-col">
          <Header>
            <HeaderContent />
          </Header>
          <main className="container py-10 flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
