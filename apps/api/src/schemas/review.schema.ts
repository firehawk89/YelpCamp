import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop()
  body: string;

  @Prop()
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
