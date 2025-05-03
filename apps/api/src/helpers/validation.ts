import { BadRequestException } from '@nestjs/common';
import { ALLOWED_IMAGE_FORMATS, MAX_IMAGE_SIZE_KB } from '@repo/constants';

export const validateBase64Image = (base64Image: string): void => {
  const mimeTypeMatch = base64Image.match(/^data:(image\/([a-zA-Z]+));base64,/);
  if (!mimeTypeMatch) {
    throw new BadRequestException('Invalid image format. The provided string is not a valid Base64-encoded image.');
  }

  const format = mimeTypeMatch[2];

  if (!ALLOWED_IMAGE_FORMATS.includes(format)) {
    const allowedFormatsString = ALLOWED_IMAGE_FORMATS.join(', ');
    throw new BadRequestException(`Invalid image format. Allowed formats are: ${allowedFormatsString}.`);
  }

  const base64Data = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

  const fileSizeInBytes =
    (base64Data.length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
  const fileSizeInKB = fileSizeInBytes / 1024;

  if (fileSizeInKB > MAX_IMAGE_SIZE_KB) {
    throw new BadRequestException(`Image size exceeds the limit of ${MAX_IMAGE_SIZE_KB / 1024} MB.`);
  }
};
