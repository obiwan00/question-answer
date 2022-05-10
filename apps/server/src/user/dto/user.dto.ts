import { ApiProperty } from "@nestjs/swagger";
import { User } from "@qa/api-interfaces";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO implements Pick<User, 'username' | 'email'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'email should be valid' })
  public email: string;
}
