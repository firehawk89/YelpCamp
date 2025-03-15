import { AuthFormFields } from '@/components/auth/helpers';
import { signUp } from '@/utils/api/auth';
import { API_ROUTES } from '@/utils/constants';
import useSWRMutation from 'swr/mutation';
import { User } from 'types/user';

export const useSignUp = () => {
  return useSWRMutation<User, Error, string, AuthFormFields>(`${API_ROUTES.AUTH}/sign-up`, signUp);
};
