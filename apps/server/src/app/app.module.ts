import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthModule } from '@qa/server/auth/google-auth/google-auth.module';
import { UserModule } from '@qa/server/user/user.module';
import { configService } from '@qa/server/typeorm';
import { AppService } from '@qa/server/app/app.service';
import { AppController } from '@qa/server/app/app.controller';
import { PassportModule } from '@nestjs/passport';


// TODO: move this file to server/src folder and remove redundant files, such as app.controller, app.service etc.
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PassportModule.register({ session: true }),
    GoogleAuthModule,


    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
