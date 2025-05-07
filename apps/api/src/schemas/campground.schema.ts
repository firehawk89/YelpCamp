import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Image, ImageSchema } from './image.schema';
import { Location, LocationSchema } from './location.schema';
import { Price, PriceSchema } from './price.schema';

export type CampgroundDocument = HydratedDocument<Campground>;

@Schema({ timestamps: true })
export class Campground {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: false, type: [ImageSchema], default: null })
  images?: Image[];

  @Prop({ required: true, type: PriceSchema })
  price: Price;

  @Prop({ required: false, default: null })
  description?: string;

  @Prop({ required: true, type: LocationSchema })
  location: Location;

  @Prop({ required: false, min: 1, max: 5, default: null })
  rating?: number;

  @Prop({ required: false, default: 0 })
  reviewsCount?: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  author?: mongoose.Types.ObjectId;
}

export const CampgroundSchema = SchemaFactory.createForClass(Campground);
