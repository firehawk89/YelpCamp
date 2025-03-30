import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { ACCESS_TOKEN_EXPIRATION_SECONDS } from './helpers/constants';
import { AuthModule } from './modules/auth/auth.module';
import { CampgroundsModule } from './modules/campgrounds/campgrounds.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({ uri: config.get<string>('database.url') }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
