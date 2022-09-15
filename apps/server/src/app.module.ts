import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthModule } from '@qa/server/auth/google-auth/google-auth.module';
import { TagModule } from '@qa/server/tag/tag.module';
import { configService } from '@qa/server/typeorm';
import { UserModule } from '@qa/server/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),

    // auth
    PassportModule.register({ session: true }),
    GoogleAuthModule,

    UserModule,
    TagModule,
  ],
})
export class AppModule { }
