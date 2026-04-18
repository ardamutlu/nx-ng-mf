import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(protected config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: `${config.get<string>('API_URL')}/auth/google/callback`,
      scope: ['email', 'profile'],
      // @ts-ignore
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    return done(null, {
      sub: profile.id,
      email: profile.emails?.[0].value,
      name: profile.displayName,
      avatar_url: profile.photos?.[0]?.value,
      provider: profile.provider,
    });
  }
}
