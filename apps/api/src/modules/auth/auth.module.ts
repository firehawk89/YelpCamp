import { Module, forwardRef } from '@nestjs/common';

import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UsersModule), TokensModule],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
