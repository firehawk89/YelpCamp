import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageType } from '@repo/types';
import mongoose, { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop({ required: true })
  url: string;

  @Prop({ required: false, default: null })
  fileName?: string;

  @Prop({ required: false, enum: ImageType, default: ImageType.CAMPGROUND })
  type?: ImageType;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Campground', default: null })
  campgroundId?: mongoose.Types.ObjectId;

  @Prop({ required: false, type: [Number], default: [], select: false })
  embedding?: number[];
}

export const ImageSchema = SchemaFactory.createForClass(Image);

export type ImageWithSimilarity = ImageDocument & { similarity: number };
