import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '@qa/server/tag/tag.service';
import { CreateTopicDto, TopicResponseDto } from '@qa/server/topic/dto/topic.dto';
import { TopicEntity } from '@qa/server/topic/topic.entity';
import { UserEntity } from '@qa/server/user/user.entity';
import slugify from "slugify";
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TopicService {

  public constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
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

  public buildTopicResponse(topic: TopicEntity): TopicResponseDto {
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

  public async findTopicBySlug(slug: string): Promise<TopicEntity> {
    return this.topicRepository.findOne({
      where: { slug },
    });
  }

  public async deleteTopicBySlug(currentUserId: number, slug: string): Promise<DeleteResult> {
    const topicToDelete = await this.topicRepository.findOne({
      where: { slug },
    });

    if (!topicToDelete) {
      throw new HttpException("There is no such topic", HttpStatus.NOT_FOUND);
    }

    if (topicToDelete.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to delete this article", HttpStatus.FORBIDDEN);
    }

    return await this.topicRepository.delete(topicToDelete);
  }
}
