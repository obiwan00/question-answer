import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from '@qa/server/topic/dto/topic.dto';
import { TopicService } from '@qa/server/topic/topic.service';
import { User } from '@qa/server/user/decorators/user.decorator';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { TopicResponse } from 'libs/api-interfaces';

@ApiTags('question')
@Controller('questions')
export class TopicController {

  public constructor(private readonly topicService: TopicService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  public async create(@User() currentUser: UserEntity, @Body() createTopicDto: CreateTopicDto): Promise<TopicResponse> {
    const topic = await this.topicService.create(currentUser, createTopicDto);
    return this.topicService.buildTopicResponse(topic);
  }


}
