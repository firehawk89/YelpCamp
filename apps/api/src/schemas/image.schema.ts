import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop()
  url: string;

  @Prop()
  filename: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
