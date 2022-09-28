import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto, TopicResponseDto, UpdateTopicDto } from '@qa/server/topic/dto/topic.dto';
import { TopicService } from '@qa/server/topic/topic.service';
import { User } from '@qa/server/user/decorators/user.decorator';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('topic')
@Controller('topics')
export class TopicController {

  public constructor(private readonly topicService: TopicService) {
  }

  @Post()
  @UseGuards(AuthGuard)
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
  public async deleteTopicBySlug(@User('id') currentUserId: number, @Param('slug') slug: string): Promise<DeleteResult> {
    return await this.topicService.deleteTopicBySlug(currentUserId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  public async updateTopicBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<TopicResponseDto> {
    const topic = await this.topicService.updateTopicBySlug(currentUserId, slug, updateTopicDto);
    return this.topicService.buildTopicResponse(topic);
  }

}
