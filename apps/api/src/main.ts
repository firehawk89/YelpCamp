import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //   const configService = app.get(ConfigService);

  // FIXME: Resolve origin based on environment
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.useBodyParser('json', { limit: '10mb' });
  app.useGlobalPipes(new ValidationPipe());

  //   const port = configService.get<number>('port');
  //   console.log('port', port, process.env.PORT);
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
