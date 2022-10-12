import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '@qa/server/tag/tag.service';
import { CreateTopicDto, TopicResponseDto, TopicsResponseDto, UpdateTopicDto } from '@qa/server/topic/dto/topic.dto';
import { TopicEntity } from '@qa/server/topic/topic.entity';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';
import { LikeStatus, TopicsRequest, TopicWithLikeStatusResponse } from 'libs/api-interfaces';
import slugify from "slugify";
import { DeleteResult, getRepository, In, Repository } from 'typeorm';

@Injectable()
export class TopicService {

  public constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
    private tagService: TagService,
  ) { }

  public async findAll(query: TopicsRequest, currentUserId?: number): Promise<TopicsResponseDto> {
    let { offset, limit } = query;
    offset = typeof query.offset === 'string' ? parseInt(query.offset, 10) : 0;
    limit = typeof query.limit === 'string' ? parseInt(query.limit, 10) : 0;

    const queryBuilder = getRepository(TopicEntity)
      .createQueryBuilder('topics')
      .select('topics.id')
      .leftJoin('topics.author', 'users')
      .leftJoin('topics.tags', 'tags');


    if (query.search) {
      queryBuilder.andWhere('topics.title LIKE :search', { search: `%${query.search}%` });
    }

    if (query.tags) {
      const tags = Array.isArray(query.tags) ? query.tags : [query.tags];

      queryBuilder.andWhere(`tags.name IN (:...tags) `, { tags })
        .groupBy('topics.id')
        .having('count(*) = :tagsCount', { tagsCount: tags.length });
    }

    const selectedTopicsIds = await queryBuilder.getMany();

    const topics = await this.topicRepository.find({
      where: { id: In(selectedTopicsIds.map(({ id }) => id)) },
      take: limit,
      skip: offset,
      order: { 'updatedAt': 'DESC' },
    });

    const currentUserWithLikeStatus = await this.userService.getUserByIdWithLikeStatus(currentUserId);

    console.log(currentUserWithLikeStatus);


    return {
      count: selectedTopicsIds.length,
      offset,
      limit,
      topics: await Promise.all(topics.map(topic => this.buildTopicResponse({ topic, currentUserWithLikeStatus }))),
    };
  }

  public async create(currentUser: UserEntity, createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    const newTopic = new TopicEntity();
    Object.assign(newTopic, createTopicDto);
    newTopic.author = currentUser;
    newTopic.slug = this.getSlug(createTopicDto.title);
    newTopic.tags = this.tagService.getTagEntitiesByNames(createTopicDto.tags);

    return this.topicRepository.save(newTopic);
  }

  public async buildTopicResponse({ topic, currentUserId, currentUserWithLikeStatus }: {
    topic: TopicEntity,
    currentUserId?: number,
    currentUserWithLikeStatus?: UserEntity,
  } = {
      topic: null,
      currentUserId: null,
      currentUserWithLikeStatus: null,
    }
  ): Promise<TopicResponseDto> {
    let likeStatus = LikeStatus.NEUTRAL;

    currentUserWithLikeStatus = currentUserWithLikeStatus || await this.userService.getUserByIdWithLikeStatus(currentUserId);

    if (currentUserWithLikeStatus) {
      const isTopicLiked = currentUserWithLikeStatus.likes
        .find(({ id: likedTopicId }) => likedTopicId === topic.id);
      const isTopicDisliked = currentUserWithLikeStatus.dislikes
        .find(({ id: dislikedTopicId }) => dislikedTopicId === topic.id);

      if (isTopicLiked) {
        likeStatus = LikeStatus.LIKED;
      } else if (isTopicDisliked) {
        likeStatus = LikeStatus.DISLIKED;
      }
    }

    return {
      ...topic,
      tags: topic?.tags?.map(({ name }) => name),
      likeStatus,
    };
  }

  private getSlug(string: string): string {
    const uniquePostfix = (Math.random() * Math.pow(36, 6) | 0);
    const slug = slugify(string, { lower: true });
    return `${slug}-${uniquePostfix}`;
  }

  public async findTopicBySlug(slug: string): Promise<TopicEntity> {
    const topicBySlug = await this.topicRepository.findOne({
      where: { slug },
    });

    if (!topicBySlug) {
      throw new HttpException("There is no such topic", HttpStatus.NOT_FOUND);
    }

    return topicBySlug;
  }

  public async deleteTopicBySlug(currentUserId: number, slug: string): Promise<DeleteResult> {
    const topicToDelete = await this.findTopicBySlug(slug);

    if (topicToDelete.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to delete this article", HttpStatus.FORBIDDEN);
    }

    // TODO: fix delete
    return await this.topicRepository.delete(topicToDelete);
  }

  public async updateTopicBySlug(currentUserId: number, slug: string, updateTopicDto: UpdateTopicDto): Promise<TopicEntity> {
    const topicToUpdate = await this.topicRepository.findOne({
      where: { slug },
    });

    if (!topicToUpdate) {
      throw new HttpException("There is no such topic", HttpStatus.NOT_FOUND);
    }

    if (topicToUpdate.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to update this article", HttpStatus.FORBIDDEN);
    }

    Object.assign(topicToUpdate, updateTopicDto);
    topicToUpdate.tags = this.tagService.getTagEntitiesByNames(updateTopicDto.tags);

    return await this.topicRepository.save(topicToUpdate);
  }

  public async likeTopicBySlug(currentUserId: number, slug: string): Promise<TopicEntity> {
    const topicForInteraction = await this.findTopicBySlug(slug);
    const currentUser = await this.userService.getUserByIdWithLikeStatus(currentUserId);

    const isAlreadyLikedTopicIndex = currentUser.likes.findIndex((likedTopic) => likedTopic.id === topicForInteraction.id)
    if (isAlreadyLikedTopicIndex !== -1) {
      currentUser.likes.splice(isAlreadyLikedTopicIndex, 1);
      topicForInteraction.likesCount--;
    } else {
      currentUser.likes.push(topicForInteraction);
      topicForInteraction.likesCount++;

      const isAlreadyDislikedTopicIndex = currentUser.dislikes.findIndex((dislikedTopic) => dislikedTopic.id === topicForInteraction.id)
      if (isAlreadyDislikedTopicIndex !== -1) {
        currentUser.dislikes.splice(isAlreadyDislikedTopicIndex, 1);
        topicForInteraction.likesCount++;
      }
    }

    await this.userRepository.save(currentUser);
    await this.topicRepository.save(topicForInteraction);
    return topicForInteraction;
  }

  public async dislikeTopicBySlug(currentUserId: number, slug: string): Promise<TopicEntity> {
    const topicForInteraction = await this.findTopicBySlug(slug);
    const currentUser = await this.userService.getUserByIdWithLikeStatus(currentUserId);

    const isAlreadyDislikedTopicIndex = currentUser.dislikes.findIndex((dislikedTopic) => dislikedTopic.id === topicForInteraction.id)
    if (isAlreadyDislikedTopicIndex !== -1) {
      currentUser.dislikes.splice(isAlreadyDislikedTopicIndex, 1);
      topicForInteraction.likesCount++;
    } else {
      currentUser.dislikes.push(topicForInteraction);
      topicForInteraction.likesCount--;

      const isAlreadyLikedTopicIndex = currentUser.likes.findIndex((likedTopic) => likedTopic.id === topicForInteraction.id)
      if (isAlreadyLikedTopicIndex !== -1) {
        currentUser.likes.splice(isAlreadyLikedTopicIndex, 1);
        topicForInteraction.likesCount--;
      }
    }

    await this.userRepository.save(currentUser);
    await this.topicRepository.save(topicForInteraction);
    return topicForInteraction;
  }
}
