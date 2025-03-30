import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SeederService } from './modules/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = app.get(SeederService);
  await seeder.seedDatabase();

  await app.close();
}
bootstrap();
