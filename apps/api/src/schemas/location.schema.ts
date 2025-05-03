import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LATITUDE_RANGE, LONGITUDE_RANGE } from '@repo/constants';

@Schema({ _id: false })
export class Coordinates {
  @Prop({ required: true, type: Number, min: LONGITUDE_RANGE.MIN, max: LONGITUDE_RANGE.MAX })
  longitude: number;

  @Prop({ required: true, type: Number, min: LATITUDE_RANGE.MAX, max: LATITUDE_RANGE.MAX })
  latitude: number;
}

export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

@Schema({ _id: false })
export class Location {
  @Prop({ required: true })
  full_address: string;

  @Prop({ required: true, type: CoordinatesSchema })
  coordinates: Coordinates;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
