import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: false, default: null })
  body?: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campground', required: true })
  campgroundId: mongoose.Types.ObjectId;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   author: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
