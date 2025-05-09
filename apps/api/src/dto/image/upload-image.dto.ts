import { ImageType } from '@repo/types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsBase64Image } from 'src/decorators/isBase64Image.decorator';

export class UploadImageDTO {
  @IsNotEmpty()
  @IsBase64Image()
  image: string;

  @IsOptional()
  @IsEnum(ImageType)
  type?: ImageType = ImageType.CAMPGROUND;

  @IsOptional()
  @IsString()
  folderPath?: string;
}
