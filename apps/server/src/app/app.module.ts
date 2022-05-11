import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthModule } from '@qa/server/auth/google-auth/google-auth.module';
import { UserModule } from '@qa/server/user/user.module';
import { configService } from '@qa/server/typeorm';
import { AppService } from '@qa/server/app/app.service';
import { AppController } from '@qa/server/app/app.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    GoogleAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
