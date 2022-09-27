import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto, TopicResponseDto } from '@qa/server/topic/dto/topic.dto';
import { TopicService } from '@qa/server/topic/topic.service';
import { User } from '@qa/server/user/decorators/user.decorator';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';

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

}
