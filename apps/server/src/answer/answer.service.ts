import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from '@qa/server/answer/answer.entity';
import { TopicService } from '@qa/server/topic/topic.service';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';
import { LikeStatus } from 'libs/api-interfaces';
import { Repository } from 'typeorm';
import { AnswerResponseDto, CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswerService {

  public constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
    @Inject(forwardRef(() => TopicService))
    private topicService: TopicService,
  ) {

  }

  public async create(currentUser: UserEntity, createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
    const topic = await this.topicService.findTopicById(createAnswerDto.topicId);

    const newAnswer = new AnswerEntity();
    newAnswer.body = createAnswerDto.body
    newAnswer.author = currentUser;
    newAnswer.topic = topic;

    return this.answerRepository.save(newAnswer);
  }

  public async findAnswerById(id: number): Promise<AnswerEntity> {
    const answerById = await this.answerRepository.findOne({
      where: { id },
    });

    if (!answerById) {
      throw new HttpException("There is no such answer", HttpStatus.NOT_FOUND);
    }

    return answerById;
  }

  public async update(answerId: number, currentUserId: number, updateAnswerDto: UpdateAnswerDto): Promise<AnswerEntity> {
    const answerToUpdate = await this.findAnswerById(answerId)

    if (answerToUpdate.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to update this article", HttpStatus.FORBIDDEN);
    }

    Object.assign(answerToUpdate, updateAnswerDto);

    return await this.answerRepository.save(answerToUpdate);
  }

  public async buildAnswerResponse({ answer, currentUserId, currentUserWithLikeStatus }: {
    answer: AnswerEntity,
    currentUserId?: number,
    currentUserWithLikeStatus?: UserEntity,
  }): Promise<AnswerResponseDto> {
    let likeStatus = LikeStatus.NEUTRAL;

    currentUserWithLikeStatus = currentUserWithLikeStatus || await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    if (currentUserWithLikeStatus) {
      const isAnswerLiked = currentUserWithLikeStatus.answerLikes
        .find(({ id: likedAnswerId }) => likedAnswerId === answer.id);
      const isAnswerDisliked = currentUserWithLikeStatus.answerDislikes
        .find(({ id: dislikedAnswerId }) => dislikedAnswerId === answer.id);

      if (isAnswerLiked) {
        likeStatus = LikeStatus.LIKED;
      } else if (isAnswerDisliked) {
        likeStatus = LikeStatus.DISLIKED;
      }
    }

    return {
      ...answer,
      likeStatus,
    };
  }

  public async likeAnswerById(currentUserId: number, answerId: number): Promise<AnswerEntity> {
    const answerForInteraction = await this.findAnswerById(answerId);
    const currentUser = await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    const isAlreadyLikedAnswerIndex = currentUser.answerLikes.findIndex((likedAnswer) => likedAnswer.id === answerForInteraction.id)
    if (isAlreadyLikedAnswerIndex !== -1) {
      currentUser.answerLikes.splice(isAlreadyLikedAnswerIndex, 1);
      answerForInteraction.likesCount--;
    } else {
      currentUser.answerLikes.push(answerForInteraction);
      answerForInteraction.likesCount++;

      const isAlreadyDislikedAnswerIndex = currentUser.answerDislikes.findIndex((dislikedAnswer) => dislikedAnswer.id === answerForInteraction.id)
      if (isAlreadyDislikedAnswerIndex !== -1) {
        currentUser.answerDislikes.splice(isAlreadyDislikedAnswerIndex, 1);
        answerForInteraction.likesCount++;
      }
    }

    await this.userRepository.save(currentUser);
    await this.answerRepository.save(answerForInteraction);
    return answerForInteraction;
  }

  public async dislikeAnswerById(currentUserId: number, answerId: number): Promise<AnswerEntity> {
    const answerForInteraction = await this.findAnswerById(answerId);
    const currentUser = await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    const isAlreadyDislikedAnswerIndex = currentUser.answerDislikes.findIndex((dislikedAnswer) => dislikedAnswer.id === answerForInteraction.id)
    if (isAlreadyDislikedAnswerIndex !== -1) {
      currentUser.answerDislikes.splice(isAlreadyDislikedAnswerIndex, 1);
      answerForInteraction.likesCount++;
    } else {
      currentUser.answerDislikes.push(answerForInteraction);
      answerForInteraction.likesCount--;

      const isAlreadyLikedAnswerIndex = currentUser.answerLikes.findIndex((likedAnswer) => likedAnswer.id === answerForInteraction.id)
      if (isAlreadyLikedAnswerIndex !== -1) {
        currentUser.answerLikes.splice(isAlreadyLikedAnswerIndex, 1);
        answerForInteraction.likesCount--;
      }
    }

    await this.userRepository.save(currentUser);
    await this.answerRepository.save(answerForInteraction);
    return answerForInteraction;
  }

  public async findAnswersForTopic(topicId: number, currentUserId?: number): Promise<AnswerResponseDto[]> {
    const answersForTopic = await this.answerRepository.find({
      where: { topic: topicId }
    })

    const currentUserWithLikeStatus = await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    return await Promise.all(answersForTopic.map(answerForTopic =>
      this.buildAnswerResponse({ answer: answerForTopic, currentUserWithLikeStatus })))
  }
}
