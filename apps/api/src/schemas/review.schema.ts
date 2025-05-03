import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  MAX_REVIEW_BODY_LENGTH,
  MAX_REVIEW_RATING,
  MAX_REVIEW_TITLE_LENGTH,
  MIN_REVIEW_BODY_LENGTH,
  MIN_REVIEW_RATING,
  MIN_REVIEW_TITLE_LENGTH,
} from '@repo/constants';
import mongoose, { HydratedDocument } from 'mongoose';

import { Campground } from './campground.schema';
import { User } from './user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, min: MIN_REVIEW_RATING, max: MAX_REVIEW_RATING })
  rating: number;

  @Prop({ default: null, minlength: MIN_REVIEW_TITLE_LENGTH, maxlength: MAX_REVIEW_TITLE_LENGTH })
  title?: string;

  @Prop({ required: true, minlength: MIN_REVIEW_BODY_LENGTH, maxlength: MAX_REVIEW_BODY_LENGTH })
  body: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: User.name, default: [] })
  likedBy?: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campground.name, required: true })
  campground: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  author: mongoose.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
