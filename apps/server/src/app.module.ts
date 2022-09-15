import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthModule } from '@qa/server/auth/google-auth/google-auth.module';
import { TagModule } from '@qa/server/tag/tag.module';
import { UserModule } from '@qa/server/user/user.module';
import ormconfig from '@qa/server/typeorm/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    // auth
    PassportModule.register({ session: true }),
    GoogleAuthModule,

    UserModule,
    TagModule,
  ],
})
export class AppModule { }
