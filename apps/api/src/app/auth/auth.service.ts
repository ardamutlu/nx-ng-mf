import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  generateTokens(user: any) {
    return {
      accessToken: this.jwt.sign(user, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME as StringValue,
      }),
      refreshToken: this.jwt.sign(user, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME as StringValue,
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
      await fetch(
        `${process.env.GOOGLE_OAUTH2_URL}/revoke?token=${accessToken}`,
        {
          method: 'POST',
          headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        },
      );
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
