import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(protected config: ConfigService) {
    super({
      clientID: config.get<string>('GITHUB_CLIENT_ID')!,
      clientSecret: config.get<string>('GITHUB_CLIENT_SECRET')!,
      callbackURL: `${config.get<string>('API_URL')}/auth/github/callback`,
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      sub: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      avatar_url: profile.photos?.[0]?.value,
      provider: profile.provider,
    };
  }
}
