import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@qa/server/user/decorators/user.decorator';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserAuthResponseDto } from '@qa/server/user/dto/user.dto';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';


@ApiTags('user')
@Controller()
export class UserController {

  public constructor(private userService: UserService) {
  }

  @Post('users')
  @ApiCreatedResponse({ type: UserAuthResponseDto })
  public async create(@Body() createUserDTO: CreateUserDto): Promise<UserAuthResponseDto> {
    const user = await this.userService.create(createUserDTO);
    return this.userService.buildCreateUserResponse(user);
  }

  @Post('users/login')
  @ApiCreatedResponse({ type: UserAuthResponseDto })
  public async login(@Body() loginUserDto: LoginUserDto): Promise<UserAuthResponseDto> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildCreateUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserAuthResponseDto })
  public async currentUser(@User() user: UserEntity): Promise<UserAuthResponseDto> {
    return this.userService.buildCreateUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserAuthResponseDto })
  public async updateCurrentUser(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto): Promise<UserAuthResponseDto> {
    const updatedUser = await this.userService.update(user.id, updateUserDto);
    return this.userService.buildCreateUserResponse(updatedUser);
  }
}
