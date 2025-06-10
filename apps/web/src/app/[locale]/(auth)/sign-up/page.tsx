import SignUpForm from '@/modules/auth/components/SignUpForm';
import { SearchParams } from '@/types/misc';

export default async function SignUp({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const returnTo = (await searchParams).returnTo as unknown as string;

  return <SignUpForm returnTo={returnTo} />;
}
