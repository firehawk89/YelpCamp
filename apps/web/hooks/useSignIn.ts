import { AuthFormFields } from '@/components/auth/helpers';
import { signIn } from '@/utils/api/auth';
import { API_ROUTES } from '@/utils/constants';
import useSWRMutation from 'swr/mutation';
import { UserTokens } from 'types/user';

export const useSignIn = () => {
  return useSWRMutation<UserTokens, Error, string, AuthFormFields>(`${API_ROUTES.AUTH}/sign-in`, signIn);
};
