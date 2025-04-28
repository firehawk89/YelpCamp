'use client';

import { routes } from '@/app/routes';
import Modal from '@/components/Modal';
import { updateUserPassword } from '@/server/user';
import { User } from '@/types/user';
import { cn, parseErrorMessages } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@repo/ui/alert';
import Button from '@repo/ui/button';
import { CardProps } from '@repo/ui/card';
import InputWrapper from '@repo/ui/input-wrapper';
import PasswordInput from '@repo/ui/password-input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ChangePasswordFormFields, changePasswordFormSchema } from '../../helpers';

interface ChangePasswordModalProps extends Omit<CardProps, 'orientation'> {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: ChangePasswordFormFields) => void;
}

const ChangePasswordModal = ({ user, isOpen, onClose, className, ...props }: ChangePasswordModalProps) => {
  const router = useRouter();

  const [saveErrors, setSaveErrors] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ChangePasswordFormFields>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormFields> = async (data) => {
    if (!user?._id) return;

    setSaveErrors(null);

    try {
      await updateUserPassword(user._id, data);
      reset();
      onClose();
      router.push(routes.signIn());
    } catch (error) {
      const errorMessages = parseErrorMessages(error, 'Failed to update password');
      setSaveErrors(errorMessages);
    }
  };

  return (
    <Modal
      className={cn('max-w-96', className)}
      isHidden={!isOpen}
      onClose={onClose}
      title="Update Password"
      {...props}
    >
      <div className="flex flex-col gap-5">
        {saveErrors?.length &&
          saveErrors.map((error) => (
            <Alert color="danger" className="w-full" key={error}>
              {error}
            </Alert>
          ))}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper inputId="oldPassword" label="Old Password" error={errors.oldPassword?.message}>
            <PasswordInput {...register('oldPassword')} id="oldPassword" placeholder="Old Password" />
          </InputWrapper>

          <InputWrapper inputId="newPassword" label="New Password" error={errors.newPassword?.message}>
            <PasswordInput {...register('newPassword')} id="newPassword" placeholder="New Password" />
          </InputWrapper>

          <InputWrapper
            inputId="confirmedNewPassword"
            label="Confirm New Password"
            error={errors.confirmedNewPassword?.message}
          >
            <PasswordInput
              {...register('confirmedNewPassword')}
              id="confirmedNewPassword"
              placeholder="Confirm New Password"
            />
          </InputWrapper>

          <Button className="ml-auto min-w-20" type="submit" variant="outline" color="info" isLoading={isSubmitting}>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
