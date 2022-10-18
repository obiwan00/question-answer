import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { UserResponseDto } from '@qa/server/user/dto/user.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AnswerResponse, CreateAnswer, LikeStatus, UpdateAnswer } from "libs/api-interfaces";

export class CreateAnswerDto implements CreateAnswer {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  topicId: number;
}

export class UpdateAnswerDto extends PickType(CreateAnswerDto, ['body']) implements UpdateAnswer { }


export class AnswerResponseDto implements AnswerResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  body: string;

  @ApiProperty()
  author: UserResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: LikeStatus })
  @ApiPropertyOptional()
  likeStatus?: LikeStatus;
}
