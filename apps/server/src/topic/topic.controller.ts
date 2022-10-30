import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto, TopicResponseDto, TopicsRequestDto, TopicsResponseDto, TopicWithAnswersResponseDto, UpdateTopicDto } from '@qa/server/topic/dto/topic.dto';
import { TopicService } from '@qa/server/topic/topic.service';
import { User } from '@qa/server/user/decorators/user.decorator';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { TopicsRequest } from 'libs/api-interfaces';
import { DeleteResult } from 'typeorm';

@ApiTags('topic')
@Controller('topics')
export class TopicController {

  public constructor(private readonly topicService: TopicService) {
  }

  @Get()
  @ApiQuery({
    required: false,
    type: TopicsRequestDto,
  })
  @ApiCreatedResponse({ type: TopicsResponseDto })
  public async findAll(@Query() query: TopicsRequest, @User('id') currentUserId?: number): Promise<TopicsResponseDto> {
    return await this.topicService.findAll(query, currentUserId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async create(@User() currentUser: UserEntity, @Body() createTopicDto: CreateTopicDto): Promise<TopicResponseDto> {
    const topic = await this.topicService.create(currentUser, createTopicDto);
    return this.topicService.buildTopicResponse({ topic, currentUserId: currentUser.id });
  }

  @Get(':slug')
  @ApiCreatedResponse({ type: TopicWithAnswersResponseDto })
  public async getTopicBySlug(@Param('slug') slug: string, @User('id') currentUserId?: number): Promise<TopicWithAnswersResponseDto> {
    return await this.topicService.getTopicBySlugWithAnswers(slug, currentUserId);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async deleteTopicBySlug(@User('id') currentUserId: number, @Param('slug') slug: string): Promise<DeleteResult> {
    return await this.topicService.deleteTopicById(currentUserId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async updateTopicById(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<TopicResponseDto> {
    const topic = await this.topicService.updateTopicById(currentUserId, slug, updateTopicDto);
    return this.topicService.buildTopicResponse({ topic, currentUserId });
  }

  @Post(':topicId/like')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async likeTopicById(@User('id') currentUserId: number, @Param('topicId') topicId: string): Promise<TopicResponseDto> {
    const topic = await this.topicService.likeTopicById(currentUserId, +topicId);
    return this.topicService.buildTopicResponse({ topic, currentUserId });
  }

  @Delete(':topicId/like')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async dislikeTopicById(@User('id') currentUserId: number, @Param('topicId') topicId: string): Promise<TopicResponseDto> {
    const topic = await this.topicService.dislikeTopicById(currentUserId, +topicId);
    return this.topicService.buildTopicResponse({ topic, currentUserId });
  }

}
