import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image, ImageSchema } from './image.schema';
import { User } from './user.schema';

export type CampgroundDocument = HydratedDocument<Campground>;

@Schema({ timestamps: true })
export class Campground {
  @Prop({ required: true })
  title: string;

  //   @Prop({ type: [ImageSchema] })
  //   images: Image[];

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: false, default: null })
  description?: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: false, min: 1, max: 5, default: null })
  rating?: number;

  @Prop({ required: false, default: 0 })
  reviewsCount?: number;

  //   @Prop({
  //     raw: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } }
  //   })
  //   geometry: {
  //     type: string;
  //     coordinates: number[];
  //   };

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   author: User;
}

export const CampgroundSchema = SchemaFactory.createForClass(Campground);

// campgroundSchema.post('findOneAndDelete', async function (doc) {
//   if (doc) {
//     await Review.deleteMany({
//       _id: {
//         $in: doc.reviews
//       }
//     });
//   }
// });
