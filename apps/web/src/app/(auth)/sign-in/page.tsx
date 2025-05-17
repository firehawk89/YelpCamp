import SignInForm from '@/modules/auth/components/SignInForm';
import { SearchParams } from '@/types/misc';

export default async function SignIn({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const returnTo = (await searchParams).returnTo as unknown as string;

  return <SignInForm returnTo={returnTo} />;
}
