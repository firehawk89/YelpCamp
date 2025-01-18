import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image, ImageSchema } from './image.schema';
import { User } from './user.schema';

export type CampgroundDocument = HydratedDocument<Campground>;

@Schema()
export class Campground {
  @Prop({ required: true })
  title: string;

  //   @Prop({ type: [ImageSchema] })
  //   images: Image[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  location: string;

  //   @Prop({
  //     raw: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } }
  //   })
  //   geometry: {
  //     type: string;
  //     coordinates: number[];
  //   };

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   author: User;

  @Prop({ default: Date.now() })
  createdAt: string;

  @Prop({ default: Date.now() })
  updatedAt: string;
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
