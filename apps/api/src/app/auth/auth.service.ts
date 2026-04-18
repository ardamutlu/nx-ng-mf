import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

const ACCESS_TOKEN_EXPIRE_TIME = '15m';
const REFRESH_TOKEN_EXPIRE_TIME = '7d';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  generateTokens(user: any) {
    return {
      accessToken: this.jwt.sign(user, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwt.sign(user, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
      }),
    };
  }

  verifyRefreshToken(token: string) {
    return this.jwt.verify(token, {
      secret: this.config.get('JWT_SECRET'),
    });
  }

  refresh(refreshToken: string) {
    return this.jwt.sign(this.verifyRefreshToken(refreshToken));
  }

  async revokeGoogleToken(accessToken: string) {
    try {
      await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      });
    } catch (err) {
      console.warn('Google revoke failed:', err?.message);
    }
  }

  async logout(req: any, res: Response) {
    const accessToken = req.cookies?.accessToken;

    if (accessToken) await this.revokeGoogleToken(accessToken);

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/auth/refresh',
    });

    return true;
  }
}
