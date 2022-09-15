import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@qa/server/user/controller/user.controller';
import { UserService } from '@qa/server/user/services/user.service';
import { UserEntity } from '@qa/server/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
