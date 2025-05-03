import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Currency } from 'src/types/misc';

@Schema({ _id: false })
export class Price {
  @Prop({ required: true, min: 0 })
  value: number;

  @Prop({ required: false, enum: Currency, default: Currency.USD })
  currency: string;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
