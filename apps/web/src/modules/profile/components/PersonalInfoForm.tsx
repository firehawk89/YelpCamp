'use client';

import ErrorAlertList from '@/components/ErrorAlertList';
import { updateUserPersonalInfo } from '@/server/user';
import { User } from '@/types/user';
import { cn, parseErrorMessages } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@repo/ui/button';
import Input from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import { useTranslations } from 'next-intl';
import { FormHTMLAttributes, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getPersonalInfoFormSchema, PersonalInfoFormFields } from './../schemas/form.schema';
import ChangePasswordModal from './ChangePasswordModal';

interface PersonalInfoFormProps extends FormHTMLAttributes<HTMLFormElement> {
  user: User | null;
}

const PersonalInfoForm = ({ user, className, ...props }: PersonalInfoFormProps) => {
  const t = useTranslations('pages.profile.personalInfo');
  const tZod = useTranslations();

  const [saveErrors, setSaveErrors] = useState<string[] | null>(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

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
    resolver: zodResolver(getPersonalInfoFormSchema(tZod)),
  });

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
      const errorMessages = parseErrorMessages(error, t('errors.default'));
      setSaveErrors(errorMessages);
    }
  };

  return (
    <>
      <ErrorAlertList errors={saveErrors} />

      <form className={cn('flex flex-col gap-4', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex w-full flex-col gap-4">
            <InputWrapper inputId="firstName" label={t('firstName')} error={errors.firstName?.message}>
              <Input {...register('firstName')} id="firstName" type="text" placeholder={t('firstName')} />
            </InputWrapper>

            <InputWrapper inputId="lastName" label={t('lastName')} error={errors.lastName?.message}>
              <Input {...register('lastName')} id="lastName" type="text" placeholder={t('lastName')} />
            </InputWrapper>
          </div>

          <div className="flex w-full flex-col gap-4">
            <InputWrapper inputId="email" label={t('email')} error={errors.email?.message}>
              <Input {...register('email')} id="email" type="text" placeholder={t('email')} />
            </InputWrapper>

            <InputWrapper
              inputId="password"
              label={t('password')}
              helperElement={
                <button
                  className="text-info text-sm hover:underline"
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  type="button"
                >
                  {t('changePassword')}
                </button>
              }
            >
              <Input id="password" name="password" type="password" placeholder="••••••••" disabled />
            </InputWrapper>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {isDirty && (
            <Button className="min-w-20" type="button" variant="outline" color="destructive" onClick={() => reset()}>
              {t('actions.cancel')}
            </Button>
          )}

          <Button
            className="min-w-20"
            type="submit"
            variant="outline"
            color="info"
            disabled={!isDirty}
            isLoading={isSubmitting}
          >
            {t('actions.save')}
          </Button>
        </div>
      </form>

      {user && (
        <ChangePasswordModal
          user={user}
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default PersonalInfoForm;
