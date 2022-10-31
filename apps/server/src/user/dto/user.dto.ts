import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUser, LoginUser, UpdateUser, UserResponse, UserAuthResponse } from "@qa/api-interfaces";

export class CreateUserDto implements CreateUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

export class LoginUserDto implements LoginUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

export class UpdateUserDto implements UpdateUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;
}

export class UserResponseDto implements UserResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly email: string;
}

export class UserAuthResponseDto implements UserAuthResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly token: string;
}

