import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@qa/server/user/decorators/user.decorator';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserResponseDto } from '@qa/server/user/dto/user.dto';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';


@ApiTags('user')
@Controller()
export class UserController {

  public constructor(private userService: UserService) {
  }

  @Post('users')
  @ApiCreatedResponse({ type: UserResponseDto })
  public async create(@Body() createUserDTO: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(createUserDTO);
    return this.userService.buildCreateUserResponse(user);
  }

  @Post('users/login')
  @ApiCreatedResponse({ type: UserResponseDto })
  public async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildCreateUserResponse(user);
  }

  @Get('user')
  @ApiCreatedResponse({ type: UserResponseDto })
  @UseGuards(AuthGuard)
  public async currentUser(@User() user: UserEntity): Promise<UserResponseDto> {
    return this.userService.buildCreateUserResponse(user);
  }

  @Put('user')
  @ApiCreatedResponse({ type: UserResponseDto })
  @UseGuards(AuthGuard)
  public async updateCurrentUser(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userService.update(user.id, updateUserDto);
    return this.userService.buildCreateUserResponse(updatedUser);
  }
}
