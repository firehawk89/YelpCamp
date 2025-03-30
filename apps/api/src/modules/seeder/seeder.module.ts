import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campground, CampgroundSchema } from 'src/schemas/campground.schema';

import { SeederService } from './seeder.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Campground.name, schema: CampgroundSchema }])],
  providers: [Logger, SeederService],
})
export class SeederModule {}
