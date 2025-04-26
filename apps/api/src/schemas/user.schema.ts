import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from 'src/types/user';

import { Campground } from './campground.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: UserRole.USER, enum: UserRole })
  role: UserRole;

  @Prop({ default: null })
  avatar: string | null;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Campground.name }], default: [] })
  favoriteCampgrounds: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
