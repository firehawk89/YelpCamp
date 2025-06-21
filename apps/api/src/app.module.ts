import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ACCESS_TOKEN_EXPIRATION_SECONDS } from '@repo/constants';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CampgroundsModule } from './modules/campgrounds/campgrounds.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ImagesModule } from './modules/images/images.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const environment = config.getOrThrow<string>('environment');
        const uri =
          environment === 'production'
            ? config.get<string>('database.url.prod')
            : config.get<string>('database.url.dev');
        return { uri };
      },
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow<string>('defaultLanguage'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, '/types/i18n.ts'),
      }),
      resolvers: [AcceptLanguageResolver],
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('jwt.secret'),
        signOptions: { expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS },
      }),
      inject: [ConfigService],
      global: true,
    }),
    SeederModule,
    AuthModule,
    UsersModule,
    CampgroundsModule,
    ReviewsModule,
    CloudinaryModule,
    ImagesModule,
  ],
})
export class AppModule {}
