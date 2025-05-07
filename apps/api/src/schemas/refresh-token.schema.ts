import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { REFRESH_TOKEN_EXPIRATION_MILLISECONDS } from '@repo/constants';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from './user.schema';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop({
    default: () => new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MILLISECONDS),
    index: { expires: 0 },
  })
  expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
