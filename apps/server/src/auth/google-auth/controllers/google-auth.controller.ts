import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthService } from '@qa/server/auth/google-auth/services/google-auth.service';
import { Response } from 'express';

@ApiTags('google-auth')
@Controller('google')
export class GoogleAuthController {

  public constructor(private googleAuthService: GoogleAuthService) {
    console.log('init GoogleAuthController');

  }

  @Get('login')
  @UseGuards(AuthGuard('google'))
  public async googleAuth(): Promise<void> { return }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public async googleAuthRedirect(@Res() res: Response): Promise<Response> {
    // return this.googleAuthService.googleLogin(req);
    return res.send(200);
  }
}
