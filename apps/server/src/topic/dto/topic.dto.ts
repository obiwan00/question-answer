import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AnswerResponseDto } from "@qa/server/answer/dto/answer.dto";
import { UserResponseDto } from "@qa/server/user/dto/user.dto";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateTopic, LikeStatus, TopicResponse, TopicsRequest, TopicsResponse, TopicWithAnswersResponse, UpdateTopic } from "@qa/api-interfaces";

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
  public id: number;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public likesCount: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public body: string;

  @ApiProperty()
  public tags: string[];

  @ApiProperty()
  public author: UserResponseDto;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({ enum: LikeStatus })
  public likeStatus: LikeStatus;

  @ApiProperty()
  public hasAcceptedAnswer: boolean;

  @ApiProperty()
  public answersCount: number;

  @ApiProperty()
  public isCurrentUserTopicAuthor: boolean;
}

export class TopicWithAnswersResponseDto extends TopicResponseDto implements TopicWithAnswersResponse {
  @ApiProperty({ isArray: true, type: AnswerResponseDto })
  @ApiPropertyOptional()
  public answers: AnswerResponseDto[];
}

export class TopicsResponseDto implements TopicsResponse {
  @ApiProperty({ isArray: true, type: TopicResponseDto })
  public topics: TopicResponseDto[];

  @ApiProperty()
  public count: number;

  @ApiProperty()
  public limit: number;

  @ApiProperty()
  public offset: number;
}

export class TopicsRequestDto implements TopicsRequest {
  @ApiPropertyOptional()
  public offset?: number;

  @ApiPropertyOptional()
  public limit?: number;

  @ApiPropertyOptional({
    isArray: true,
    type: 'string',
  })
  public tags?: string[];

  @ApiPropertyOptional()
  public search?: string;
}
