import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageType } from '@repo/types';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop({ required: true })
  url: string;

  @Prop({ required: false, default: null })
  fileName?: string;

  @Prop({ required: false, enum: ImageType, default: ImageType.CAMPGROUND })
  type?: ImageType;

  @Prop({ required: false, default: null, select: false })
  embedding?: number[];
}

export const ImageSchema = SchemaFactory.createForClass(Image);
