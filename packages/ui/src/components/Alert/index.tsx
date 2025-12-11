import { CloseIcon } from '@/icons';
import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import Button from '../Button';
import Divider from '../Divider';
import IconButton from '../IconButton';
import { AlertIconMap } from './helpers';
import { alertVariants } from './variants';

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
                <Button variant="primary" color="primary" onClick={primaryAction}>
                  {primaryCtaText}
                </Button>
              )}

              {secondaryCtaText && (
                <Button variant="outline" color="secondary" onClick={secondaryAction}>
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

export { alertVariants };
