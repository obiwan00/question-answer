import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from '@qa/server/auth/google-auth/guards/google-auth.guard';
import { GoogleAuthService } from '@qa/server/auth/google-auth/services/google-auth.service';
import { Response } from 'express';

@ApiTags('google-auth')
@Controller('auth/google')
export class GoogleAuthController {

  public constructor(private googleAuthService: GoogleAuthService) {
  }

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth(): Promise<void> { return }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  public async googleAuthRedirect(@Req() res: Response): Promise<void> {
    res.send(200);
  }
}
