import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configService } from '@qa/server/typeorm';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor() {
    super({
      clientID: configService.getValue('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getValue('GOOGLE_SECRET'),
      // TODO: somewhen create shared constants file for routes
      callbackURL: `${configService.getValue('HOST')}:${configService.getValue('PORT')}/api/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    console.log('user:', user);
  }
}
