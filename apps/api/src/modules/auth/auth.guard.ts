import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@repo/types';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { handleError } from 'src/helpers/misc';
import { I18nTranslations } from 'src/types/i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { t } = I18nContext.current<I18nTranslations>();

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(t('errors.tokens.accessTokenMissing'));
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request['user'] = payload;
      return true;
    } catch (error) {
      handleError(error, AuthGuard.name, false);
      throw new UnauthorizedException(t('errors.tokens.accessTokenVerificationFailed'));
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
