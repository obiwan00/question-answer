import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@qa/server/typeorm';
import { UserDTO } from '@qa/server/user/dto/user.dto';
import { UserService } from '@qa/server/user/services/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

  public constructor(private userService: UserService) {
  }

  @Post()
  public create(@Body() createUserDTO: UserDTO): Promise<UserEntity> {
    return this.userService.create(createUserDTO);
  }
}
