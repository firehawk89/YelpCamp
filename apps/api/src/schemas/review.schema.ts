import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  MAX_RATING,
  MAX_REVIEW_BODY_LENGTH,
  MAX_REVIEW_TITLE_LENGTH,
  MIN_RATING,
  MIN_REVIEW_BODY_LENGTH,
  MIN_REVIEW_TITLE_LENGTH,
} from 'src/helpers/constants/validation';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, min: MIN_RATING, max: MAX_RATING })
  rating: number;

  @Prop({ required: false, default: null, minlength: MIN_REVIEW_TITLE_LENGTH, maxlength: MAX_REVIEW_TITLE_LENGTH })
  title?: string;

  @Prop({ required: true, minlength: MIN_REVIEW_BODY_LENGTH, maxlength: MAX_REVIEW_BODY_LENGTH })
  body: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false })
  likedBy?: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campground', required: true })
  campgroundId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: mongoose.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
