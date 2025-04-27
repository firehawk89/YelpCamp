import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { MAX_USER_NAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USER_NAME_LENGTH } from 'src/helpers/constants/validation';
import { UserRole } from 'src/types/user';

import { Campground } from './campground.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: MIN_PASSWORD_LENGTH })
  password: string;

  @Prop({ minlength: MIN_USER_NAME_LENGTH, maxlength: MAX_USER_NAME_LENGTH, default: null })
  firstName: string | null;

  @Prop({ minlength: MIN_USER_NAME_LENGTH, maxlength: MAX_USER_NAME_LENGTH, default: null })
  lastName: string | null;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: null })
  avatar: string | null;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Campground.name }], default: [] })
  favoriteCampgrounds: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
