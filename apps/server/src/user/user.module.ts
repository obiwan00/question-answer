import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "@qa/server/user/user.controller";
import { UserEntity } from "@qa/server/user/user.entity";
import { UserService } from "@qa/server/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
