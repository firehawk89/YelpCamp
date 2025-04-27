'use client';

import { updateUserPersonalInfo } from '@/server/user';
import { User } from '@/types/user';
import { cn, parseErrorMessages } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@repo/ui/alert';
import Button from '@repo/ui/button';
import Input from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import { FormHTMLAttributes, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PersonalInfoFormFields, personalInfoFormSchema } from '../helpers';
// import ChangePasswordModal from './ChangePasswordModal';

interface PersonalInfoFormProps extends FormHTMLAttributes<HTMLFormElement> {
  user: User | null;
}

const PersonalInfoForm = ({ user, className, ...props }: PersonalInfoFormProps) => {
  const [saveErrors, setSaveErrors] = useState<string[] | null>(null);
  //   const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<PersonalInfoFormFields>({
    defaultValues: {
      lastName: user?.lastName || '',
      firstName: user?.firstName || '',
      email: user?.email,
    },
    resolver: zodResolver(personalInfoFormSchema),
  });

  console.log('user', { user, isDirty });

  const onSubmit: SubmitHandler<PersonalInfoFormFields> = async (data) => {
    if (!user?._id) return;

    setSaveErrors(null);

    try {
      const updatedUser = await updateUserPersonalInfo(user._id, data);
      reset({
        lastName: updatedUser.lastName || '',
        firstName: updatedUser.firstName || '',
        email: updatedUser.email,
      });
    } catch (error) {
      const errorMessages = parseErrorMessages(error, 'Failed to update personal info');
      setSaveErrors(errorMessages);
    }
  };

  return (
    <>
      {saveErrors?.length &&
        saveErrors.map((error) => (
          <Alert key={error} className="w-full" color="danger">
            {error}
          </Alert>
        ))}

      <form className={cn('flex flex-col gap-4', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
        <div className="flex gap-6">
          <div className="flex w-full flex-col gap-4">
            <InputWrapper inputId="firstName" label="First Name" error={errors.firstName?.message}>
              <Input {...register('firstName')} id="firstName" type="text" placeholder="First Name" />
            </InputWrapper>

            <InputWrapper inputId="lastName" label="Last Name" error={errors.lastName?.message}>
              <Input {...register('lastName')} id="lastName" type="text" placeholder="Last Name" />
            </InputWrapper>
          </div>

          <div className="flex w-full flex-col gap-4">
            <InputWrapper inputId="email" label="Email" error={errors.email?.message}>
              <Input {...register('email')} id="email" type="text" placeholder="Email" />
            </InputWrapper>

            <InputWrapper
              inputId="password"
              label="Password"
              helperElement={
                <button
                  className="text-info text-sm hover:underline"
                  //   onClick={() => setIsChangePasswordModalOpen(true)}
                  type="button"
                >
                  Change Password
                </button>
              }
            >
              <Input id="password" name="password" type="password" placeholder="••••••••" disabled />
            </InputWrapper>
          </div>
        </div>

        <Button
          className="ml-auto min-w-20"
          type="submit"
          variant="outline"
          color="info"
          disabled={!isDirty}
          isLoading={isSubmitting}
        >
          Save
        </Button>
      </form>

      {/* {user && (
        <ChangePasswordModal
          user={user}
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )} */}
    </>
  );
};

export default PersonalInfoForm;
