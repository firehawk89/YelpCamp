import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { type JwtPayload } from '@repo/types';
import { User } from 'src/decorators/user.decorator';
import { UploadImageDTO } from 'src/dto/image/upload-image.dto';

import { JwtAuthGuard } from '../auth/auth.guard';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  getImageById(@Param('id') id: string) {
    return this.imagesService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createImage(@User() user: JwtPayload, @Body() uploadImageDto: UploadImageDTO) {
    return this.imagesService.create(uploadImageDto, user.userId);
  }
}
