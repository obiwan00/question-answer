import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthService } from '@qa/server/auth/google-auth/services/google-auth.service';
import { Response } from 'express';

@ApiTags('google-auth')
@Controller('auth/google')
export class GoogleAuthController {

  public constructor(private googleAuthService: GoogleAuthService) {
  }

  @Get('login')
  @UseGuards(AuthGuard('google'))
  public async googleAuth(): Promise<void> { return }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public async googleAuthRedirect(@Req() req: Response): Promise<void> {
    return this.googleAuthService.googleLogin(req);
    // res.send(200);
    // res.redirect('/');
  }
}
