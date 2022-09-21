import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "@qa/server/user/guards/user.guard";
import { UserController } from "@qa/server/user/user.controller";
import { UserEntity } from "@qa/server/user/user.entity";
import { UserService } from "@qa/server/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule { }
