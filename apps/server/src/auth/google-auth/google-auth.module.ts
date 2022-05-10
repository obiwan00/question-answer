import { Module } from '@nestjs/common';
import { GoogleAuthController } from './controllers/google-auth.controller';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleStrategyService } from './services/google-strategy.service';

@Module({
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategyService],
})
export class GoogleAuthModule { }
