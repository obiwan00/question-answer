import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@qa/server/tag/tag.module';
import ormconfig from '@qa/server/typeorm/ormconfig';
import { UserModule } from '@qa/server/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UserModule,
    TagModule,
  ],
})
export class AppModule { }
