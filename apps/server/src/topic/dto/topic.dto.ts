import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AnswerResponseDto } from "@qa/server/answer/dto/answer.dto";
import { UserResponseDto } from "@qa/server/user/dto/user.dto";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateTopic, LikeStatus, TopicResponse, TopicsRequest, TopicsResponse, TopicWithAnswersResponse, UpdateTopic } from "libs/api-interfaces";

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
  likeStatus: LikeStatus;

  @ApiProperty()
  hasAcceptedAnswer: boolean;

  @ApiProperty()
  answersCount: number;
}

export class TopicWithAnswersResponseDto extends TopicResponseDto implements TopicWithAnswersResponse {
  @ApiProperty({ isArray: true, type: AnswerResponseDto })
  @ApiPropertyOptional()
  answers: AnswerResponseDto[];
}

export class TopicsResponseDto implements TopicsResponse {
  @ApiProperty({ isArray: true, type: TopicResponseDto })
  topics: TopicResponseDto[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

export class TopicsRequestDto implements TopicsRequest {
  @ApiPropertyOptional()
  offset?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional({
    isArray: true,
    type: 'string',
  })
  tags?: string[];

  @ApiPropertyOptional()
  search?: string;
}
