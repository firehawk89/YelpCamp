import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@repo/types';
import { Request } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { handleError } from 'src/helpers/misc';
import { I18nTranslations } from 'src/types/i18n';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        this.i18n.t('errors.tokens.accessTokenMissing', { lang: I18nContext.current().lang })
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request['user'] = payload;
      return true;
    } catch (error) {
      handleError(error, JwtAuthGuard.name, false);
      throw new UnauthorizedException(
        this.i18n.t('errors.tokens.accessTokenVerificationFailed', { lang: I18nContext.current().lang })
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
