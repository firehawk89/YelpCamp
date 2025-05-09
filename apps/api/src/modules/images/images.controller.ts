import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { type JwtPayload } from '@repo/types';
import { User } from 'src/decorators/user.decorator';
import { UploadImageDTO } from 'src/dto/image/upload-image.dto';

import { AuthGuard } from '../auth/auth.guard';
import { ImagesService } from './images.service';

@UseGuards(AuthGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  uploadImage(@User() user: JwtPayload, @Body() uploadImageDto: UploadImageDTO) {
    return this.imagesService.uploadImage(uploadImageDto, user.userId);
  }
}
