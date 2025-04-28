import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UsersModule, TokensModule],
  providers: [AuthService, CloudinaryService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
