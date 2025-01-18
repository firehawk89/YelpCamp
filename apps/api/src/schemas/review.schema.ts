import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({ required: false })
  body: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campground', required: true })
  campgroundId: string;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   author: User;

  @Prop({ required: true, default: Date.now() })
  createdAt: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
