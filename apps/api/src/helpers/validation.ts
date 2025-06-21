import { BadRequestException } from '@nestjs/common';
import { ALLOWED_IMAGE_FORMATS, MAX_IMAGE_SIZE_KB } from '@repo/constants';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/types/i18n';

export const validateBase64Image = (base64Image: string, i18n: I18nService<I18nTranslations>): void => {
  const mimeTypeMatch = base64Image.match(/^data:(image\/([a-zA-Z]+));base64,/);
  if (!mimeTypeMatch) {
    throw new BadRequestException(i18n.t('errors.images.invalidImageFormat', { lang: I18nContext.current().lang }));
  }

  const format = mimeTypeMatch[2];

  if (!ALLOWED_IMAGE_FORMATS.includes(format)) {
    const allowedFormatsString = ALLOWED_IMAGE_FORMATS.join(', ');
    throw new BadRequestException(
      i18n.t('errors.images.notAllowedImageFormat', {
        lang: I18nContext.current().lang,
        args: { allowedFormatsString },
      })
    );
  }

  const base64Data = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

  const fileSizeInBytes =
    (base64Data.length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
  const fileSizeInKB = fileSizeInBytes / 1024;

  if (fileSizeInKB > MAX_IMAGE_SIZE_KB) {
    throw new BadRequestException(
      i18n.t('errors.images.imageSizeExceedsLimit', {
        lang: I18nContext.current().lang,
        args: { maxImageSizeMB: MAX_IMAGE_SIZE_KB / 1024 },
      })
    );
  }
};
