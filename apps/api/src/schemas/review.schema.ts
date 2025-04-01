import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MIN_RATING, MAX_RATING } from 'src/helpers/constants';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: false, default: null })
  body?: string;

  @Prop({ required: true, min: MIN_RATING, max: MAX_RATING })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campground', required: true })
  campgroundId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: mongoose.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
