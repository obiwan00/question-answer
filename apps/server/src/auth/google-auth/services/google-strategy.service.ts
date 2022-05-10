import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { configService } from '@qa/server/config/config.service';

@Injectable()
export class GoogleStrategyService extends PassportStrategy(Strategy, 'google') {
  public constructor() {
    super({
      clientID: configService.getValue('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getValue('GOOGLE_SECRET'),
      callbackURL: `${configService.getValue('HOST')}:${configService.getValue('PORT')}/api/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
