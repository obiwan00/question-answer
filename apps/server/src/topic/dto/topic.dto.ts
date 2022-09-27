import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@qa/server/user/dto/user.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateTopic, TopicResponse, User } from "libs/api-interfaces";

export class CreateTopicDto implements CreateTopic {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public body: string;

  @ApiProperty()
  @IsOptional()
  public tags?: string[];
}

export class TopicResponseDto implements TopicResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  tags?: string[];

  @ApiProperty()
  author: UserResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
