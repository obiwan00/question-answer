import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from '@qa/server/entity/user.entity';
import { UserController } from '@qa/server/user/controller/user.controller';
import { UserService } from '@qa/server/user/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
