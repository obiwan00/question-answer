import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AnswerEntity } from "@qa/server/answer/answer.entity";
import { AnswerResponseDto } from "@qa/server/answer/dto/answer.dto";
import { UserResponseDto } from "@qa/server/user/dto/user.dto";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateTopic, LikeStatus, TopicResponse, TopicWithAnswerResponse, UpdateTopic } from "libs/api-interfaces";

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
  @IsArray()
  @IsString({ each: true })
  public tags: string[];
}

export class UpdateTopicDto extends CreateTopicDto implements UpdateTopic {
}

export class TopicResponseDto implements TopicResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  tags: string[];

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

export class TopicWithAnswerResponseDto extends TopicResponseDto implements TopicWithAnswerResponse {
  @ApiProperty({ isArray: true, type: AnswerResponseDto })
  @ApiPropertyOptional()
  answers: AnswerResponseDto[];
}

export class TopicsResponseDto {
  @ApiProperty({ isArray: true, type: TopicResponseDto })
  topics: TopicResponseDto[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
