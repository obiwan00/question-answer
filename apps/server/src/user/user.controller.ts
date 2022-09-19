import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@qa/server/user/dto/user.dto';
import { UserService } from '@qa/server/user/user.service';

@ApiTags('user')
@Controller()
export class UserController {

  public constructor(private userService: UserService) {
  }

  @Post('users')
  public create(@Body() createUserDTO: CreateUserDto): any {
    return this.userService.create(createUserDTO);
  }
}
