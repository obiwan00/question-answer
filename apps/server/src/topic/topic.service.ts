import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '@qa/server/tag/tag.entity';
import { TagService } from '@qa/server/tag/tag.service';
import { CreateTopicDto } from '@qa/server/topic/dto/topic.dto';
import { TopicEntity } from '@qa/server/topic/topic.entity';
import { UserEntity } from '@qa/server/user/user.entity';
import { TopicResponse } from 'libs/api-interfaces';
import slugify from "slugify";
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {

  public constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<UserEntity>,
    private tagService: TagService,
  ) { }

  public async create(currentUser: UserEntity, createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    const newTopic = new TopicEntity();
    Object.assign(newTopic, createTopicDto);
    newTopic.author = currentUser;
    newTopic.slug = this.getSlug(createTopicDto.title);
    newTopic.tags = this.tagService.getTagEntitiesByNames(createTopicDto.tags);

    console.log(newTopic);
    return this.topicRepository.save(newTopic);
  }

  public buildTopicResponse(topic: TopicEntity): TopicResponse {
    return {
      ...topic,
      tags: topic?.tags?.map(({ name }) => name),
    };
  }

  private getSlug(string: string): string {
    const uniquePostfix = (Math.random() * Math.pow(36, 6) | 0);
    const slug = slugify(string, { lower: true });
    return `${slug}-${uniquePostfix}`;
  }
}