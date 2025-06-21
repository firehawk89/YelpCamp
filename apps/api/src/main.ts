import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Camp Zone API')
    .setDescription(
      'A comprehensive API for managing campgrounds, reviews, and user interactions in the Camp Zone application.'
    )
    .setVersion('1.0')
    .setContact('Camp Zone', 'https://camp-zone-web.vercel.app', 'campzone@gmail.com')
    .addServer('https://campzone-bvhe.onrender.com/', 'Production')
    .addServer('http://localhost:3001', 'Development')
    .setBasePath('/api')
    .addBearerAuth({
      type: 'http',
      description: 'JWT token for authentication',
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };

  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);
}

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

  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
