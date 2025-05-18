import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const environment = configService.get<string>('environment');

  app.enableCors({
    origin: environment === 'production' ? 'https://camp-zone-web.vercel.app' : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useBodyParser('json', { limit: '10mb' });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
