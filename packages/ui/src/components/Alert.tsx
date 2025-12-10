import { CloseIcon, IconProps, InfoTriangleIcon, MinusCircleIcon } from '@/icons';
import { CheckCircleIcon } from '@/icons/CheckCircleIcon';
import { cn } from '@/utils/misc';
import { ComponentType, HTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import Button from './Button';
import Divider from './Divider';
import IconButton from './IconButton';

export const alertVariants = tv({
  slots: {
    container: 'flex w-fit h-fit max-w-96 border border-l-0 border-gray-200 rounded-r-md overflow-hidden',
    accentLine: 'w-1.5 shrink-0 rounded-l-md',
    contentContainer: 'flex items-start py-3 px-4',
    mainContent: 'flex flex-col',
    iconContainer: 'rounded-lg border',
    icon: '',
    textContent: 'flex-1 flex items-start bg-white',
    title: 'text-sm font-semibold',
    description: 'text-sm text-gray-600',
    closeButton: '',
    ctaButtons: 'flex gap-2',
  },
  variants: {
    variant: {
      default: {
        accentLine: 'bg-secondary-500',
        iconContainer: 'bg-secondary-50 border-secondary-75 text-secondary',
      },
      success: {
        accentLine: 'bg-success-500',
        iconContainer: 'bg-success-50 border-success-75 text-success',
      },
      warning: {
        accentLine: 'bg-warning-500',
        iconContainer: 'bg-warning-50 border-warning-75 text-warning',
      },
      error: {
        accentLine: 'bg-danger-500',
        iconContainer: 'bg-danger-50 border-danger-75 text-danger',
      },
    },
    size: {
      default: {
        contentContainer: 'gap-3',
        mainContent: 'gap-3',
        iconContainer: 'p-1.5',
        icon: 'size-3',
        textContent: 'gap-3',
      },
      lg: {
        contentContainer: 'gap-4',
        mainContent: 'gap-4',
        iconContainer: 'p-2',
        icon: 'size-4',
        textContent: 'gap-4',
        title: 'text-base',
        description: 'text-sm',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const AlertIconMap: Record<keyof typeof alertVariants.variants.variant, ComponentType<IconProps>> = {
  default: CheckCircleIcon,
  success: CheckCircleIcon,
  warning: InfoTriangleIcon,
  error: MinusCircleIcon,
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title: string;
  description?: string;
  cta?: {
    primary?: {
      text: string;
      onClick: () => void;
    };
    secondary?: {
      text: string;
      onClick: () => void;
    };
  };
}

const Alert = ({ title, description, cta, className, variant, size, ...props }: AlertProps) => {
  const {
    container,
    accentLine,
    contentContainer,
    mainContent,
    textContent,
    ctaButtons,
    iconContainer,
    icon,
    title: titleClass,
    description: descriptionClass,
  } = alertVariants({ variant, size });

  const { primary: primaryCta, secondary: secondaryCta } = cta || {};
  const { text: primaryCtaText, onClick: primaryAction } = primaryCta || {};
  const { text: secondaryCtaText, onClick: secondaryAction } = secondaryCta || {};

  const IconComponent = AlertIconMap[variant || 'default'];

  return (
    <div className={cn(container(), className)} {...props}>
      <div className={accentLine()} />

      <div className={cn(contentContainer(), !description && 'items-center')}>
        <div className={iconContainer()}>
          <IconComponent className={icon()} />
        </div>

        <div className={mainContent()}>
          <div className={textContent()}>
            <div>
              <h6 className={titleClass()}>{title}</h6>
              <p className={descriptionClass()}>{description}</p>
            </div>

            <Divider orientation="vertical" />

            <IconButton icon={CloseIcon} variant="transparent" color="secondary" size="compact" />
          </div>

          {(primaryCtaText || secondaryCtaText) && (
            <div className={ctaButtons()}>
              {primaryCtaText && (
                <Button variant="default" color="default" onClick={primaryAction}>
                  {primaryCtaText}
                </Button>
              )}

              {secondaryCtaText && (
                <Button variant="outline" color="default" onClick={secondaryAction}>
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
