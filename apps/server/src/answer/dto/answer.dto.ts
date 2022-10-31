import { ApiProperty, PickType } from '@nestjs/swagger';
import { AnswerResponse, CreateAnswer, LikeStatus, UpdateAnswer } from "@qa/api-interfaces";
import { UserResponseDto } from '@qa/server/user/dto/user.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto implements CreateAnswer {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public topicId: number;
}

export class UpdateAnswerDto extends PickType(CreateAnswerDto, ['body']) implements UpdateAnswer { }


export class AnswerResponseDto implements AnswerResponse {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public accepted: boolean;

  @ApiProperty()
  public likesCount: number;

  @ApiProperty()
  public body: string;

  @ApiProperty()
  public author: UserResponseDto;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({ enum: LikeStatus })
  public likeStatus: LikeStatus;

  @ApiProperty()
  public isCurrentUserAnswerAuthor: boolean;
}
