import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from 'src/schemas/refresh-token.schema';

import { TokenService } from './tokens.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokensModule {}
