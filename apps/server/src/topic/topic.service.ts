import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from '@qa/server/answer/answer.service';
import { TagService } from '@qa/server/tag/tag.service';
import { CreateTopicDto, TopicResponseDto, TopicsResponseDto, TopicWithAnswersResponseDto, UpdateTopicDto } from '@qa/server/topic/dto/topic.dto';
import { TopicEntity } from '@qa/server/topic/topic.entity';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';
import { LikeStatus, TopicsRequest } from 'libs/api-interfaces';
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
    @Inject(forwardRef(() => AnswerService))
    private answerServices: AnswerService,
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
      queryBuilder.andWhere(
        'LOWER(topics.title) LIKE LOWER(:search) OR LOWER(topics.body) LIKE LOWER(:search)',
        { search: `%${query.search}%` }
      );
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

    const currentUserWithLikeStatus = await this.userService.getUserByIdWithTopicLikeStatus(currentUserId);

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
    currentUserWithLikeStatus = currentUserWithLikeStatus || await this.userService.getUserByIdWithTopicLikeStatus(currentUserId);
    const likeStatus = this.getTopicLikeStatus(topic.id, currentUserWithLikeStatus);

    const answersForTopic = await this.answerServices.findAnswersForTopic(topic.id);
    const hasAcceptedAnswer = !!answersForTopic.find(answer => answer.accepted);

    return {
      ...topic,
      tags: topic?.tags?.map(({ name }) => name),
      likeStatus,
      hasAcceptedAnswer,
      answersCount: answersForTopic.length,
    };
  }

  private getTopicLikeStatus(topicId: number, currentUserWithLikeStatus: UserEntity): LikeStatus {
    let likeStatus = LikeStatus.NEUTRAL;

    const isTopicLiked = currentUserWithLikeStatus?.topicLikes
      .find(({ id: likedTopicId }) => likedTopicId === topicId);
    const isTopicDisliked = currentUserWithLikeStatus?.topicDislikes
      .find(({ id: dislikedTopicId }) => dislikedTopicId === topicId);

    if (isTopicLiked) {
      likeStatus = LikeStatus.LIKED;
    } else if (isTopicDisliked) {
      likeStatus = LikeStatus.DISLIKED;
    }

    return likeStatus;
  }

  private getSlug(string: string): string {
    const uniquePostfix = (Math.random() * Math.pow(36, 6) | 0);
    const slug = slugify(string, { lower: true });
    return `${slug}-${uniquePostfix}`;
  }

  public async findTopicById(topicId: number): Promise<TopicEntity> {
    const topicById = await this.topicRepository.findOne({
      where: { id: topicId },
    });

    if (!topicById) {
      throw new HttpException("There is no such topic", HttpStatus.NOT_FOUND);
    }

    return topicById;
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

  public async getTopicBySlugWithAnswers(slug: string, currentUserId?: number): Promise<TopicWithAnswersResponseDto> {
    const topicById = await this.findTopicBySlug(slug);

    const answers = await this.answerServices.findAnswersForTopic(topicById.id, currentUserId)

    const formattedTopic = await this.buildTopicResponse({ topic: topicById, currentUserId })

    return {
      ...formattedTopic,
      answers,
    };
  }

  public async deleteTopicById(currentUserId: number, topicSlug: string): Promise<DeleteResult> {
    const topicToDelete = await this.findTopicBySlug(topicSlug);

    if (topicToDelete.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to delete this topic", HttpStatus.FORBIDDEN);
    }

    // TODO: fix delete
    return await this.topicRepository.delete(topicToDelete);
  }

  public async updateTopicById(currentUserId: number, topicSlug: string, updateTopicDto: UpdateTopicDto): Promise<TopicEntity> {
    const topicToUpdate = await this.findTopicBySlug(topicSlug);

    if (topicToUpdate.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to update this topic", HttpStatus.FORBIDDEN);
    }

    Object.assign(topicToUpdate, updateTopicDto);
    topicToUpdate.tags = this.tagService.getTagEntitiesByNames(updateTopicDto.tags);

    return await this.topicRepository.save(topicToUpdate);
  }

  public async likeTopicById(currentUserId: number, topicId: number): Promise<TopicEntity> {
    const topicForInteraction = await this.findTopicById(topicId);
    const currentUser = await this.userService.getUserByIdWithTopicLikeStatus(currentUserId);

    const isAlreadyLikedTopicIndex = currentUser.topicLikes.findIndex((likedTopic) => likedTopic.id === topicForInteraction.id)
    if (isAlreadyLikedTopicIndex !== -1) {
      currentUser.topicLikes.splice(isAlreadyLikedTopicIndex, 1);
      topicForInteraction.likesCount--;
    } else {
      currentUser.topicLikes.push(topicForInteraction);
      topicForInteraction.likesCount++;

      const isAlreadyDislikedTopicIndex = currentUser.topicDislikes.findIndex((dislikedTopic) => dislikedTopic.id === topicForInteraction.id)
      if (isAlreadyDislikedTopicIndex !== -1) {
        currentUser.topicDislikes.splice(isAlreadyDislikedTopicIndex, 1);
        topicForInteraction.likesCount++;
      }
    }

    await this.userRepository.save(currentUser);
    await this.topicRepository.save(topicForInteraction);
    return topicForInteraction;
  }

  public async dislikeTopicById(currentUserId: number, topicId: number): Promise<TopicEntity> {
    const topicForInteraction = await this.findTopicById(topicId);
    const currentUser = await this.userService.getUserByIdWithTopicLikeStatus(currentUserId);

    const isAlreadyDislikedTopicIndex = currentUser.topicDislikes.findIndex((dislikedTopic) => dislikedTopic.id === topicForInteraction.id)
    if (isAlreadyDislikedTopicIndex !== -1) {
      currentUser.topicDislikes.splice(isAlreadyDislikedTopicIndex, 1);
      topicForInteraction.likesCount++;
    } else {
      currentUser.topicDislikes.push(topicForInteraction);
      topicForInteraction.likesCount--;

      const isAlreadyLikedTopicIndex = currentUser.topicLikes.findIndex((likedTopic) => likedTopic.id === topicForInteraction.id)
      if (isAlreadyLikedTopicIndex !== -1) {
        currentUser.topicLikes.splice(isAlreadyLikedTopicIndex, 1);
        topicForInteraction.likesCount--;
      }
    }

    await this.userRepository.save(currentUser);
    await this.topicRepository.save(topicForInteraction);
    return topicForInteraction;
  }
}
