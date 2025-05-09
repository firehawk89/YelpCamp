import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from 'src/schemas/image.schema';

import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]), CloudinaryModule],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
