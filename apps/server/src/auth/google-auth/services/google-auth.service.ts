import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {

  public googleLogin(req: any): any {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
