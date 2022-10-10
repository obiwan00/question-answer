import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto, TopicResponseDto, TopicsResponseDto, UpdateTopicDto } from '@qa/server/topic/dto/topic.dto';
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
  @ApiCreatedResponse({ type: TopicsResponseDto })
  public async findAll(@Query() query: TopicsRequest): Promise<TopicsResponseDto> {
    return await this.topicService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async create(@User() currentUser: UserEntity, @Body() createTopicDto: CreateTopicDto): Promise<TopicResponseDto> {
    const topic = await this.topicService.create(currentUser, createTopicDto);
    return this.topicService.buildTopicResponse(topic);
  }

  @Get(':slug')
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async getTopicBySlug(@Param('slug') slug: string): Promise<TopicResponseDto> {
    const topic = await this.topicService.findTopicBySlug(slug);
    return this.topicService.buildTopicResponse(topic);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async deleteTopicBySlug(@User('id') currentUserId: number, @Param('slug') slug: string): Promise<DeleteResult> {
    return await this.topicService.deleteTopicBySlug(currentUserId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TopicResponseDto })
  public async updateTopicBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<TopicResponseDto> {
    const topic = await this.topicService.updateTopicBySlug(currentUserId, slug, updateTopicDto);
    return this.topicService.buildTopicResponse(topic);
  }

}
